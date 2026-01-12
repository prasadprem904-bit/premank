import { motion } from "framer-motion";
import { Shield, Award, Truck, RotateCcw, CreditCard, Clock } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "100% Authentic", subtext: "Certified Diamonds" },
  { icon: Award, label: "GIA & IGI", subtext: "Certified Quality" },
  { icon: Truck, label: "Free Shipping", subtext: "Insured Delivery" },
  { icon: RotateCcw, label: "30-Day Returns", subtext: "Hassle Free" },
  { icon: CreditCard, label: "Secure Payment", subtext: "256-bit SSL" },
  { icon: Clock, label: "24/7 Support", subtext: "Expert Help" }
];

export const TrustBadgesStrip = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-secondary/30 border-y border-border/50 py-4 sm:py-6"
    >
      <div className="container mx-auto px-4">
        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 justify-center"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <badge.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{badge.label}</p>
                <p className="text-xs text-muted-foreground">{badge.subtext}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Marquee */}
        <div className="sm:hidden overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...trustBadges, ...trustBadges].map((badge, index) => (
              <div key={`${badge.label}-${index}`} className="flex items-center gap-2">
                <badge.icon className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
