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
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="card-luxury group"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <button
          onClick={handleClick}
          className="relative w-full h-52 sm:h-64 md:h-72 bg-transparent border-none p-0 cursor-pointer overflow-hidden"
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
        
        {/* Animated Sparkles - Hidden on mobile for performance */}
        <motion.div
          className="absolute top-10 left-10 opacity-0 group-hover:opacity-100 hidden sm:block"
          initial={{ scale: 0, rotate: 0 }}
          whileHover={{ scale: 1, rotate: 180 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        >
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary fill-primary" />
        </motion.div>
        <motion.div
          className="absolute bottom-16 right-10 opacity-0 group-hover:opacity-100 hidden sm:block"
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary fill-primary" />
        </motion.div>
        <motion.div
          className="absolute top-24 right-20 opacity-0 group-hover:opacity-100 hidden sm:block"
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary fill-primary" />
        </motion.div>
        
        {/* Wishlist Heart Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlistToggle}
          className={cn(
            "absolute top-3 left-3 sm:top-4 sm:left-4 z-10 p-2.5 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm min-w-[44px] min-h-[44px] flex items-center justify-center",
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
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1 sm:gap-1.5 bg-black/60 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-primary/30">
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary fill-primary" />
          <span className="text-xs sm:text-sm text-white font-semibold">{diamond.rating}</span>
        </div>

        {/* Premium Badge */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
          <LuxuryBadge variant="gold" className="text-xs">Premium</LuxuryBadge>
        </div>

        {/* Quick View Overlay - Hidden on mobile, tap to view instead */}
        <motion.div 
          className="absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hidden sm:flex"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <LuxuryButton 
            variant="luxury" 
            size="default" 
            onClick={handleClick}
            className="gap-2 shadow-gold-intense"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            Quick View
          </LuxuryButton>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-5 bg-gradient-to-b from-card to-secondary/30">
        <div>
          <h3 className="text-base sm:text-lg lg:text-xl font-playfair font-bold text-foreground mb-1 sm:mb-2 group-hover:text-gold-gradient transition-colors line-clamp-1">
            {diamond.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary flex-shrink-0"></span>
            <span className="line-clamp-1">{diamond.carat} Carat • {diamond.cut} • {diamond.color}</span>
          </p>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-0.5 sm:mb-1">Price</p>
            <p className="text-lg sm:text-xl lg:text-2xl font-playfair font-bold text-gold-gradient truncate">
              ₹{diamond.price.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-0.5 sm:mb-1">Clarity</p>
            <p className="text-base sm:text-lg font-semibold text-foreground">{diamond.clarity}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="luxury-divider !my-3 sm:!my-4"></div>

        <LuxuryButton 
          variant="luxury-outline" 
          className="w-full min-h-[48px]"
          onClick={handleClick}
        >
          View Details
        </LuxuryButton>
      </div>
    </motion.div>
  );
};
