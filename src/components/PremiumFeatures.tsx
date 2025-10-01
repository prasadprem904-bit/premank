import { motion } from "framer-motion";
import { Shield, Award, Gem, Star, Heart, RotateCcw } from "lucide-react";
import { LuxuryButton } from "./ui/luxury-button";
import { SoundButton } from "./ui/SoundButton";

interface PremiumFeaturesProps {
  onViewDiamond: (diamond: any) => void;
}

export const PremiumFeatures = ({ onViewDiamond }: PremiumFeaturesProps) => {
  const categories = [
    {
      title: "Solitaire Collection",
      description: "Timeless elegance in every stone",
      icon: Gem,
      count: "500+",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Engagement Rings",
      description: "Your perfect moment deserves perfection",
      icon: Heart,
      count: "200+",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Wedding Sets",
      description: "Complete luxury for your special day",
      icon: Award,
      count: "150+",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Luxury Gifts",
      description: "Exceptional pieces for exceptional people",
      icon: Star,
      count: "300+",
      image: "/api/placeholder/300/200"
    }
  ];

  const features = [
    {
      icon: RotateCcw,
      title: "3D Diamond Viewer",
      description: "Rotate & zoom to see every detail"
    },
    {
      icon: Shield,
      title: "IGI / GIA Certified",
      description: "Every diamond comes with authentication"
    },
    {
      icon: Award,
      title: "Virtual Try-On",
      description: "Upload your photo & see jewelry"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Categories Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">
            Premium Collections
          </h2>
          <p className="text-muted-foreground text-lg">
            Curated excellence for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group"
            >
              <SoundButton
                className="w-full bg-transparent border-none p-0"
                soundType="sparkle"
              >
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-luxury hover:shadow-glow transition-all duration-300 group-hover:scale-105">
                  <div className="h-48 bg-gradient-diamond relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {category.count}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <category.icon className="w-8 h-8 text-accent mb-2" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-playfair font-semibold text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <LuxuryButton variant="luxury-outline" size="sm" className="w-full">
                      Explore Collection
                    </LuxuryButton>
                  </div>
                </div>
              </SoundButton>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Premium Features */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="container mx-auto px-4 py-16 bg-card/30 rounded-2xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">
            Why Choose D&O Collections?
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience luxury shopping with cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 * index }}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-10 h-10 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-playfair font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Trust Badges & Stats */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="container mx-auto px-4 text-center"
      >
        <div className="bg-gradient-to-r from-secondary/20 to-accent/20 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-playfair font-bold text-accent mb-2">10,000+</div>
              <div className="text-muted-foreground">Diamonds Sold</div>
            </div>
            <div>
              <div className="text-3xl font-playfair font-bold text-accent mb-2">2,000+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-playfair font-bold text-accent mb-2">100%</div>
              <div className="text-muted-foreground">Certified Diamonds</div>
            </div>
            <div>
              <div className="text-3xl font-playfair font-bold text-accent mb-2">25+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};