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
      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <ScrollReveal direction="up" className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-foreground mb-2 sm:mb-3">
            Trusted by Thousands
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Our numbers speak for our commitment to excellence
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6" staggerDelay={0.1}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label} direction="up">
              <Card className="p-4 sm:p-5 lg:p-6 text-center bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30">
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mx-auto mb-2 sm:mb-3 text-primary" />
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-primary mb-0.5 sm:mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Premium Features */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 bg-card/30 rounded-xl sm:rounded-2xl">
        <ScrollReveal direction="up" className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-2 sm:mb-4">
            Why Choose Premank?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            Experience luxury shopping with cutting-edge technology
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.15}>
          {features.map((feature, index) => (
            <StaggerItem key={feature.title} direction="up">
              <div className="text-center group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-accent-foreground" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-playfair font-semibold text-foreground mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
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