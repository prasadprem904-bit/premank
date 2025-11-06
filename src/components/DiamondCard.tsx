import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

import { LuxuryButton } from "./ui/luxury-button";

export interface Diamond {
  id: string;
  name: string;
  price: number;
  carat: number;
  cut: string;
  color: string;
  clarity: string;
  image: string;
  rating: number;
  certification?: "IGI" | "GIA";
}

interface DiamondCardProps {
  diamond: Diamond;
  onView: (diamond: Diamond) => void;
}

export const DiamondCard = ({ diamond, onView }: DiamondCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-luxury hover:shadow-glow transition-all duration-300 group"
    >
      <div className="relative overflow-hidden diamond-shine">
        <button
          onClick={() => onView(diamond)}
          className="relative w-full h-64 bg-transparent border-none p-0 cursor-pointer"
        >
          <img 
            src={diamond.image} 
            alt={diamond.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Animated Sparkles */}
        <motion.div
          className="absolute top-8 left-8 opacity-0 group-hover:opacity-100"
          initial={{ scale: 0, rotate: 0 }}
          whileHover={{ scale: 1, rotate: 180 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Sparkles className="w-6 h-6 text-accent fill-accent" />
        </motion.div>
        <motion.div
          className="absolute bottom-12 right-12 opacity-0 group-hover:opacity-100"
          initial={{ scale: 0, rotate: 0 }}
          whileHover={{ scale: 1, rotate: -180 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Sparkles className="w-5 h-5 text-accent fill-accent" />
        </motion.div>
        <motion.div
          className="absolute top-20 right-16 opacity-0 group-hover:opacity-100"
          initial={{ scale: 0, rotate: 0 }}
          whileHover={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Sparkles className="w-4 h-4 text-accent fill-accent" />
        </motion.div>
        
        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full">
          <Star className="w-3 h-3 text-accent fill-current" />
          <span className="text-xs text-white font-medium">{diamond.rating}</span>
        </div>

        {/* Quick View Button */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <LuxuryButton 
            variant="luxury" 
            size="lg" 
            onClick={() => onView(diamond)}
            className="gap-2"
          >
            Quick View
          </LuxuryButton>
        </motion.div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-playfair font-semibold text-foreground mb-1">
            {diamond.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {diamond.carat} Carat • {diamond.cut} • {diamond.color}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Price</p>
            <p className="text-2xl font-playfair font-bold text-accent">
              ₹{diamond.price.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Clarity</p>
            <p className="text-sm font-medium text-foreground">{diamond.clarity}</p>
          </div>
        </div>

        <LuxuryButton 
          variant="luxury-outline" 
          className="w-full"
          onClick={() => onView(diamond)}
        >
          View Details
        </LuxuryButton>
      </div>
    </motion.div>
  );
};