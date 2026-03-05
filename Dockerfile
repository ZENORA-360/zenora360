# =============================================================================
# ZENORA Web - Production Dockerfile
# Multi-stage build for minimal, secure, and reproducible image
# =============================================================================

# --- Build Stage ---
FROM oven/bun:1.3.4 AS builder

WORKDIR /app

# Copy only necessary files for dependency installation
COPY package.json bun.lockb ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile --production

# Copy source and build (exclude unnecessary files)
COPY . .
RUN bun run build

# --- Production Stage ---
FROM nginx:1.27.1-alpine

# Security: create non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Copy custom nginx config (ensure it listens on 8080)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder --chown=appuser:appgroup /app/dist /usr/share/nginx/html

# Security: set permissions and healthcheck
RUN chown -R appuser:appgroup /var/cache/nginx /var/log/nginx && \
    mkdir -p /var/run/nginx && \
    chown appuser:appgroup /var/run/nginx

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]

# --- Build Metadata ---
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION=latest
LABEL org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.source="https://github.com/zenora/zenora-web" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.vendor="ZENORA" \
      org.opencontainers.image.title="ZENORA Web" \
      org.opencontainers.image.description="ZENORA Digital Solutions Platform" \
      org.opencontainers.image.licenses="MIT"
