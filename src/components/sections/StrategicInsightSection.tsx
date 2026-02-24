import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Shield, HeadphonesIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroDigital from "@/assets/hero-digital.jpg";

export const StrategicInsightSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();

  const features = [
    {
      icon: CheckCircle2,
      title: language === "fr" ? "Méthodologie Agile" : "Agile Methodology",
      description: language === "fr"
        ? "Itération rapide et livraison continue pour vous garder en avance."
        : "Rapid iteration and continuous delivery to keep you ahead.",
    },
    {
      icon: Shield,
      title: language === "fr" ? "Sécurité d'abord" : "Security First",
      description: language === "fr"
        ? "Protocoles de sécurité de niveau entreprise intégrés dans chaque ligne de code."
        : "Enterprise-grade security protocols embedded in every line of code.",
    },
    {
      icon: HeadphonesIcon,
      title: language === "fr" ? "Support 24/7" : "24/7 Support",
      description: language === "fr"
        ? "Équipes dédiées garantissant que vos systèmes ne dorment jamais."
        : "Dedicated teams ensuring your systems never sleep.",
    },
  ];

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-zenora relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 relative rounded-2xl overflow-hidden aspect-square group"
          >
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
            <img
              src={heroDigital}
              alt={language === "fr" ? "Équipe travaillant sur des solutions digitales" : "Team working on digital solutions"}
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 border border-border rounded-2xl z-20 pointer-events-none" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2 flex flex-col gap-8"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-foreground">
              {language === "fr" ? "Vision stratégique et" : "Strategic insight meets"}{" "}
              <br />
              <span className="text-gradient-gold">
                {language === "fr" ? "maîtrise technique." : "technical mastery."}
              </span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {language === "fr"
                ? "Nous ne construisons pas juste des logiciels ; nous créons des écosystèmes. Notre approche combine une connaissance approfondie de l'industrie avec une technologie de pointe pour résoudre des défis commerciaux complexes."
                : "We don't just build software; we engineer ecosystems. Our approach combines deep industry knowledge with cutting-edge technology to solve complex business challenges."}
            </p>

            {/* Features */}
            <div className="flex flex-col gap-4 mt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <feature.icon className="w-6 h-6 text-primary mt-0.5 flex-shrink-0 drop-shadow-[0_0_8px_hsla(42,70%,50%,0.4)]" />
                  <div>
                    <h4 className="text-foreground font-bold text-lg">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
