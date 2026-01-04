import { motion } from "framer-motion";
import { Shield, Award, TrendingUp, Sparkles, Users, Gem as GemIcon } from "lucide-react";
import { Card } from "./ui/card";
import { LuxuryButton } from "./ui/luxury-button";
import type { Diamond } from "./DiamondCard";
import { Gem, Star, Heart, RotateCcw } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ui/ScrollReveal";
import { AnimatedCounter } from "./ui/AnimatedCounter";

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

  const stats = [
    { value: 10000, suffix: "+", label: "Diamonds Sold", icon: GemIcon },
    { value: 2000, suffix: "+", label: "Happy Clients", icon: Users },
    { value: 15, suffix: "+", label: "Years of Excellence", icon: Award },
    { value: 100, suffix: "%", label: "Certified Authentic", icon: Shield },
  ];

  return (
    <div className="space-y-10 sm:space-y-12 lg:space-y-16">
      {/* Premium Features */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 bg-card/30 rounded-xl sm:rounded-2xl max-w-[1200px]">
        <ScrollReveal direction="up" className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-2 sm:mb-4 px-2">
            Why Choose Premank?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground px-4">
            Experience luxury shopping with cutting-edge technology
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.15}>
          {features.map((feature, index) => (
            <StaggerItem key={feature.title} direction="up">
              <div className="text-center group p-4 sm:p-6">
                <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-accent-foreground" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-playfair font-semibold text-foreground mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
};