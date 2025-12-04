import { motion } from "framer-motion";
import { Star, Sparkles, Heart, Eye } from "lucide-react";
import { LuxuryButton } from "./ui/luxury-button";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { LuxuryBadge } from "./ui/LuxuryBadge";

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
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(diamond.id);

  const handleClick = () => {
    onView(diamond);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(diamond.id);
    } else {
      addToWishlist(diamond.id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card-luxury group"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <button
          onClick={handleClick}
          className="relative w-full h-72 bg-transparent border-none p-0 cursor-pointer overflow-hidden"
        >
          <img 
            src={diamond.image} 
            alt={diamond.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-elegant"
          />
          
          {/* Luxury Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </button>
        
        {/* Animated Sparkles */}
        <motion.div
          className="absolute top-10 left-10 opacity-0 group-hover:opacity-100"
          initial={{ scale: 0, rotate: 0 }}
          whileHover={{ scale: 1, rotate: 180 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        >
          <Sparkles className="w-6 h-6 text-primary fill-primary" />
        </motion.div>
        <motion.div
          className="absolute bottom-16 right-10 opacity-0 group-hover:opacity-100"
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <Sparkles className="w-5 h-5 text-primary fill-primary" />
        </motion.div>
        <motion.div
          className="absolute top-24 right-20 opacity-0 group-hover:opacity-100"
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <Sparkles className="w-4 h-4 text-primary fill-primary" />
        </motion.div>
        
        {/* Wishlist Heart Button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlistToggle}
          className={cn(
            "absolute top-4 left-4 z-10 p-3 rounded-full transition-all duration-300 backdrop-blur-sm",
            inWishlist 
              ? "bg-red-500/90 shadow-lg" 
              : "bg-black/50 hover:bg-black/70"
          )}
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-all duration-300",
              inWishlist ? "text-white fill-white" : "text-white"
            )}
          />
        </motion.button>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/30">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm text-white font-semibold">{diamond.rating}</span>
        </div>

        {/* Premium Badge */}
        <div className="absolute bottom-4 left-4">
          <LuxuryBadge variant="gold">Premium</LuxuryBadge>
        </div>

        {/* Quick View Overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <LuxuryButton 
            variant="luxury" 
            size="lg" 
            onClick={handleClick}
            className="gap-2 shadow-gold-intense"
          >
            <Eye className="w-5 h-5" />
            Quick View
          </LuxuryButton>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-5 bg-gradient-to-b from-card to-secondary/30">
        <div>
          <h3 className="text-xl font-playfair font-bold text-foreground mb-2 group-hover:text-gold-gradient transition-colors">
            {diamond.name}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
            {diamond.carat} Carat • {diamond.cut} • {diamond.color}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Price</p>
            <p className="text-2xl font-playfair font-bold text-gold-gradient">
              ₹{diamond.price.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Clarity</p>
            <p className="text-lg font-semibold text-foreground">{diamond.clarity}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="luxury-divider !my-4"></div>

        <LuxuryButton 
          variant="luxury-outline" 
          className="w-full"
          onClick={handleClick}
        >
          View Details
        </LuxuryButton>
      </div>
    </motion.div>
  );
};
