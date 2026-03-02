import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/useLanguage";

export const TrustedBySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t, language } = useLanguage();

  const companies = [
    { name: "ACME Corp", icon: "◆" },
    { name: "Infinite", icon: "∞" },
    { name: "HexaTech", icon: "⬡" },
    { name: "Nexus", icon: "◉" },
    { name: "Vertex", icon: "△" },
  ];

  return (
    <section
      ref={ref}
      className="py-16 px-4 bg-background border-y border-border/50"
    >
      <div className="container-zenora">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-10"
        >
          <p className="text-primary/70 text-xs font-bold uppercase tracking-[0.25em] text-center">
            {language === "fr" 
              ? "Ils nous font confiance" 
              : "Trusted by forward-thinking companies"}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 hover:opacity-80 transition-opacity duration-700">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-default"
              >
                <span className="text-primary text-xl">{company.icon}</span>
                <span className="font-display font-bold text-lg">{company.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
