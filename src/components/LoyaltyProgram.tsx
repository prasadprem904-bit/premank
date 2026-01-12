import { motion } from "framer-motion";
import { Crown, Star, Gem, Gift, Sparkles, Shield, Truck, Clock } from "lucide-react";
import { LuxuryBadge } from "./ui/LuxuryBadge";
import { LuxuryButton } from "./ui/luxury-button";

interface LoyaltyTier {
  name: string;
  icon: React.ElementType;
  color: string;
  minSpend: string;
  benefits: string[];
  gradient: string;
}

const loyaltyTiers: LoyaltyTier[] = [
  {
    name: "Gold",
    icon: Star,
    color: "text-yellow-500",
    minSpend: "₹1 Lakh+",
    benefits: ["5% Cashback", "Priority Support", "Early Access to Sales"],
    gradient: "from-yellow-400 to-amber-500"
  },
  {
    name: "Platinum",
    icon: Gem,
    color: "text-slate-400",
    minSpend: "₹5 Lakh+",
    benefits: ["10% Cashback", "Free Shipping", "Exclusive Events", "Personal Stylist"],
    gradient: "from-slate-300 to-slate-500"
  },
  {
    name: "Elite",
    icon: Crown,
    color: "text-primary",
    minSpend: "₹15 Lakh+",
    benefits: ["15% Cashback", "VIP Lounge Access", "Bespoke Designs", "Annual Gift", "Diamond Investment Advisory"],
    gradient: "from-primary via-amber-400 to-primary"
  }
];

const perks = [
  { icon: Gift, title: "Birthday Rewards", desc: "Special gifts on your special day" },
  { icon: Sparkles, title: "Point Multipliers", desc: "Earn 2x points during events" },
  { icon: Shield, title: "Lifetime Warranty", desc: "On all Elite purchases" },
  { icon: Truck, title: "White Glove Delivery", desc: "Premium insured shipping" },
  { icon: Clock, title: "Preview Access", desc: "First look at new collections" }
];

export const LoyaltyProgram = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24"
    >
      {/* Header */}
      <div className="text-center mb-10 sm:mb-16">
        <LuxuryBadge variant="gold" className="mb-3 sm:mb-4">
          <Crown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          Exclusive Membership
        </LuxuryBadge>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-foreground mb-3 sm:mb-4">
          Premank <span className="text-gold-gradient">Elite Club</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
          Join our exclusive loyalty program and unlock unparalleled benefits with every purchase
        </p>
      </div>

      {/* Loyalty Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16">
        {loyaltyTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`relative bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-border shadow-elegant overflow-hidden ${
              tier.name === "Elite" ? "ring-2 ring-primary" : ""
            }`}
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-5`} />
            
            {/* Popular Badge for Elite */}
            {tier.name === "Elite" && (
              <div className="absolute top-3 right-3">
                <LuxuryBadge variant="gold" className="text-xs">Most Popular</LuxuryBadge>
              </div>
            )}

            <div className="relative z-10">
              {/* Tier Icon */}
              <motion.div
                className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${tier.gradient} mb-4 sm:mb-6 shadow-lg`}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <tier.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </motion.div>

              {/* Tier Name */}
              <h3 className={`text-xl sm:text-2xl font-playfair font-bold mb-2 ${tier.color}`}>
                {tier.name}
              </h3>
              
              {/* Minimum Spend */}
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                Spend {tier.minSpend} to unlock
              </p>

              {/* Benefits */}
              <ul className="space-y-2 sm:space-y-3">
                {tier.benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Perks */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-lg sm:text-xl font-playfair font-bold text-center mb-6 sm:mb-8">
          Additional Member Perks
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {perks.map((perk, index) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-secondary/50 rounded-xl p-3 sm:p-4 text-center"
            >
              <perk.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2" />
              <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-1">{perk.title}</h4>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-10 sm:mt-16"
      >
        <LuxuryButton variant="luxury" size="lg" className="gap-2">
          <Crown className="w-5 h-5" />
          Join Elite Club
        </LuxuryButton>
        <p className="text-xs text-muted-foreground mt-3">
          Free to join • Instant rewards on your first purchase
        </p>
      </motion.div>
    </motion.section>
  );
};
