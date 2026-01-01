import { motion } from "framer-motion";
import { Shield, Award, TrendingUp, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { LuxuryButton } from "./ui/luxury-button";
import type { Diamond } from "./DiamondCard";
import { Gem, Star, Heart, RotateCcw } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ui/ScrollReveal";

interface PremiumFeaturesProps {
  onViewDiamond: (diamond: any) => void;
}

export const PremiumFeatures = ({
  onViewDiamond
}: PremiumFeaturesProps) => {
  const categories = [{
    title: "Solitaire Collection",
    description: "Timeless elegance in every stone",
    icon: Gem,
    count: "500+",
    image: "/api/placeholder/300/200"
  }, {
    title: "Engagement Rings",
    description: "Your perfect moment deserves perfection",
    icon: Heart,
    count: "200+",
    image: "/api/placeholder/300/200"
  }, {
    title: "Wedding Sets",
    description: "Complete luxury for your special day",
    icon: Award,
    count: "150+",
    image: "/api/placeholder/300/200"
  }, {
    title: "Luxury Gifts",
    description: "Exceptional pieces for exceptional people",
    icon: Star,
    count: "300+",
    image: "/api/placeholder/300/200"
  }];

  const features = [{
    icon: RotateCcw,
    title: "3D Diamond Viewer",
    description: "Rotate & zoom to see every detail"
  }, {
    icon: Shield,
    title: "IGI / GIA Certified",
    description: "Every diamond comes with authentication"
  }, {
    icon: Award,
    title: "Virtual Try-On",
    description: "Upload your photo & see jewelry"
  }];

  return (
    <div className="space-y-16">
      {/* Premium Features */}
      <section className="container mx-auto px-4 py-16 bg-card/30 rounded-2xl">
        <ScrollReveal direction="up" className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">
            Why Choose Premank?
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience luxury shopping with cutting-edge technology
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {features.map((feature, index) => (
            <StaggerItem key={feature.title} direction="up">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Trust Badges & Stats */}
      <section className="container mx-auto px-4 text-center">
      </section>
    </div>
  );
};