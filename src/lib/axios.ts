import axios from 'axios';

const API_BASE_URL = 'https://api.zenora360.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('zenora-admin-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.isTimeout = true;
    }
    if (!navigator.onLine) {
      error.isOffline = true;
    }
    return Promise.reject(error);
  }
);

export default api;
