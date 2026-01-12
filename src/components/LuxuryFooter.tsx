import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Heart, Diamond } from "lucide-react";
import premankPremiumLogo from "@/assets/premank-premium-logo.png";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
  { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-500" }
];

const quickLinks = [
  { label: "Diamond Collection", href: "#" },
  { label: "Custom Designs", href: "#" },
  { label: "Certification", href: "#" },
  { label: "Virtual Try-On", href: "#" }
];

const supportLinks = [
  { label: "Contact Us", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Shipping Info", href: "#" },
  { label: "Returns Policy", href: "#" }
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" }
];

export const LuxuryFooter = () => {
  return (
    <footer className="relative bg-gradient-to-b from-background via-secondary/30 to-secondary/50 pt-12 sm:pt-16 lg:pt-24 pb-6">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-10 sm:mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <motion.img
              src={premankPremiumLogo}
              alt="Premank"
              className="h-16 sm:h-20 object-contain mb-4"
              whileHover={{ scale: 1.05 }}
            />
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              India's premier destination for certified natural diamonds. Experience luxury like never before.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className={`p-2.5 bg-secondary rounded-lg text-muted-foreground transition-colors ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm sm:text-base font-playfair font-bold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <Diamond className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm sm:text-base font-playfair font-bold text-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <Diamond className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm sm:text-base font-playfair font-bold text-foreground mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Diamond District, Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:info@premank.com" className="hover:text-primary transition-colors">
                  info@premank.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 py-6 sm:py-8 border-t border-b border-border/50"
        >
          {["GIA Certified", "IGI Certified", "Secure Payments", "Free Shipping", "30-Day Returns"].map((badge, i) => (
            <div
              key={badge}
              className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              {badge}
            </div>
          ))}
        </motion.div>

        {/* Bottom Footer */}
        <div className="pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} Premank Jewellers. All rights reserved.
            </p>

            {/* Slogan */}
            <motion.p
              className="flex items-center gap-1.5 text-sm font-playfair text-gold-gradient"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Bright your own jewellery
              <span className="text-primary">✨</span>
            </motion.p>

            {/* Legal Links */}
            <div className="flex gap-4">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Made with Love */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs text-muted-foreground/60 mt-6 flex items-center justify-center gap-1"
          >
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in India
          </motion.p>
        </div>
      </div>
    </footer>
  );
};
