import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Grid3X3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import logoZenora from "@/assets/logo-zenora-full.png";
import { useRef } from "react";

export const HeroSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        
        {/* Radial gradient glow */}
        <div className="absolute inset-0 bg-gold-gradient-radial opacity-50" />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-[15%] left-[15%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Floating particles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-primary rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-0.5 h-0.5 bg-foreground/50 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 2,
          }}
        />
      </div>

      {/* Decorative border frame */}
      <motion.div 
        className="absolute inset-6 md:inset-10 border border-primary/10 rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Content */}
      <motion.div 
        className="container-zenora relative z-10 py-32 md:py-40"
        style={{ y, opacity }}
      >
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Future Ready Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card/50 border border-primary/30 backdrop-blur-md shadow-lg group hover:border-primary/60 transition-all duration-500 cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary glow-gold"></span>
              </span>
              <span className="text-xs md:text-sm font-bold text-foreground/80 tracking-[0.2em] uppercase font-display group-hover:text-primary transition-colors">
                {t("hero.futureReady") || "Future Ready"}
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter mb-8"
          >
            <span className="text-foreground">{t("hero.slogan.from")}</span>
            <span className="text-foreground"> </span>
            <span className="text-foreground">{t("hero.slogan.zero")}</span>
            <br className="md:hidden" />
            <span className="text-foreground"> </span>
            <span className="text-gradient-gold text-glow-gold">{t("hero.slogan.to")} {t("hero.slogan.zenith")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto mb-12"
          >
            {t("hero.description.part1") || "Propelling brands through"}{" "}
            <span className="text-foreground font-medium border-b border-primary/50">{t("hero.feature.webDev")}</span>,{" "}
            <span className="text-foreground font-medium border-b border-primary/50">{t("hero.feature.design")}</span>,{" "}
            {t("hero.description.and") || "and"}{" "}
            <span className="text-foreground font-medium border-b border-primary/50">{t("hero.feature.solutions")}</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-16"
          >
            <Button
              variant="hero"
              size="xl"
              className="group relative min-w-[220px] h-16 text-lg glow-gold hover:glow-gold-lg transition-all duration-500"
              asChild
            >
              <Link to="/contact">
                <span className="flex items-center gap-2">
                  {t("hero.cta.start")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              className="group min-w-[220px] h-16 text-lg backdrop-blur-md"
              asChild
            >
              <Link to="/services">
                <span className="flex items-center gap-2">
                  {t("hero.cta.discover")}
                  <Grid3X3 className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all" />
                </span>
              </Link>
            </Button>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={logoZenora}
                alt="Zenora"
                className="h-16 md:h-20 w-auto opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
