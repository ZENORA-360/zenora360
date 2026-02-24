import { motion } from "framer-motion";
import { ArrowUp, Mail, Phone, MapPin, Globe, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { FooterParticles } from "@/components/FooterParticles";
import logoZenora from "@/assets/logo-zenora-full.png";

export const Footer = () => {
  const { t, language } = useLanguage();

  const footerLinks = [
    {
      title: language === "fr" ? "Entreprise" : "Company",
      links: [
        { label: t("nav.about"), href: "/a-propos" },
        { label: t("nav.method"), href: "/methode" },
        { label: t("nav.contact"), href: "/contact" },
      ],
    },
    {
      title: t("footer.services"),
      links: [
        { label: t("nav.webDev"), href: "/services/developpement-web" },
        { label: t("nav.marketing"), href: "/services/marketing-digital" },
        { label: t("nav.design"), href: "/services/design-graphic" },
        { label: t("nav.solutions"), href: "/services/solutions-metiers" },
      ],
    },
  ];

  const contactInfo = [
    { icon: Mail, label: "contact@zenora360.com", href: "mailto:contact@zenora360.com" },
    { icon: Phone, label: "+237 655 958 641", href: "tel:+237655958641" },
    { icon: MapPin, label: "Melen, Yaoundé - Cameroun", href: "https://maps.google.com/?q=Melen,Yaoundé,Cameroun" },
  ];

  const socialLinks = [
    { icon: Globe, href: "https://zenora360.com", label: "Website" },
    { icon: Instagram, href: "https://instagram.com/zenora_officiel", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/zenora", label: "LinkedIn" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Golden mouse trail particles */}
      <FooterParticles />
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none z-[1]" />

      {/* Main footer */}
      <div className="container-zenora py-20 relative z-[2]">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src={logoZenora} 
                alt="Zenora" 
                className="h-14 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" 
              />
            </Link>
            <p className="font-display text-lg text-secondary-foreground/70 mb-4 italic">
              {t("footer.slogan.from")} <span className="text-primary font-semibold">{t("footer.slogan.zero")}</span> {t("footer.slogan.to")}{" "}
              <span className="text-primary font-semibold">{t("footer.slogan.zenith")}</span>
            </p>
            <p className="text-secondary-foreground/50 leading-relaxed text-sm mb-6">
              {t("footer.description")}
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary-foreground/10 hover:bg-primary/20 flex items-center justify-center text-secondary-foreground/60 hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={section.title}>
              <h4 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-5">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={link.href}
                      className="text-secondary-foreground/60 hover:text-primary transition-colors duration-300 text-sm inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-2" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-5">
              {language === "fr" ? "Contact" : "Connect"}
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.li 
                  key={item.label} 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-secondary-foreground/60 group-hover:text-primary text-sm transition-colors">{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary-foreground/10 relative z-[2]">
        <div className="container-zenora py-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-secondary-foreground/40 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} ZENORA. {t("footer.rights")}
            </p>

            <div className="flex items-center gap-6">
              <nav className="flex items-center gap-4 text-sm">
                <Link to="/privacy" className="text-secondary-foreground/40 hover:text-primary transition-colors duration-300">
                  {t("footer.privacy")}
                </Link>
                <span className="text-secondary-foreground/20">•</span>
                <Link to="/mentions-legales" className="text-secondary-foreground/40 hover:text-primary transition-colors duration-300">
                  {t("footer.legal")}
                </Link>
                <span className="text-secondary-foreground/20">•</span>
                <Link to="/faq" className="text-secondary-foreground/40 hover:text-primary transition-colors duration-300">
                  FAQ
                </Link>
              </nav>

              {/* Back to top */}
              <motion.button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-sm text-secondary-foreground/50 hover:text-primary transition-all duration-300 group"
                whileHover={{ y: -2 }}
              >
                {t("footer.backToTop")}
                <span className="w-9 h-9 rounded-full border border-secondary-foreground/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                  <ArrowUp className="w-4 h-4" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
