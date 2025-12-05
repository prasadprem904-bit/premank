import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Scale, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { DiamondCard, Diamond } from './DiamondCard';
import { Button } from './ui/button';
import { DiamondComparison } from './DiamondComparison';

// Sample diamond data - same as HomePage
const sampleDiamonds: Diamond[] = [
  {
    id: "1",
    name: "Radiant Solitaire",
    price: 125000,
    carat: 1.5,
    cut: "Excellent",
    color: "D",
    clarity: "VVS1",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    certification: "GIA"
  },
  {
    id: "2",
    name: "Eternal Brilliance",
    price: 185000,
    carat: 2.0,
    cut: "Ideal",
    color: "E",
    clarity: "IF",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    certification: "IGI"
  },
  {
    id: "3",
    name: "Celestial Star",
    price: 95000,
    carat: 1.2,
    cut: "Very Good",
    color: "F",
    clarity: "VS1",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    certification: "GIA"
  },
];

interface DiamondWishlistProps {
  onViewDetails: (diamond: Diamond) => void;
  onBack: () => void;
}

export const DiamondWishlist = ({ onViewDetails, onBack }: DiamondWishlistProps) => {
  const { user } = useAuth();
  const [wishlistDiamonds, setWishlistDiamonds] = useState<Diamond[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<Diamond[]>([]);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('wishlist')
      .select('diamond_id')
      .eq('user_id', user.id);

    if (!error && data) {
      const wishlistIds = data.map(item => item.diamond_id);
      const diamonds = sampleDiamonds.filter(d => wishlistIds.includes(d.id));
      setWishlistDiamonds(diamonds);
    }
  };

  const handleCompareToggle = (diamond: Diamond) => {
    setSelectedForCompare(prev => {
      const isSelected = prev.find(d => d.id === diamond.id);
      if (isSelected) {
        return prev.filter(d => d.id !== diamond.id);
      } else if (prev.length < 4) {
        return [...prev, diamond];
      }
      return prev;
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background pt-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-3xl font-playfair font-bold mb-4">Your Wishlist</h2>
          <p className="text-muted-foreground">Please sign in to view your wishlist</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-playfair font-bold mb-2">My Wishlist</h1>
              <p className="text-muted-foreground">
                {wishlistDiamonds.length} {wishlistDiamonds.length === 1 ? 'diamond' : 'diamonds'} saved
              </p>
            </div>
            
            {wishlistDiamonds.length > 1 && (
              <div className="flex gap-2">
                <Button
                  variant={compareMode ? "default" : "outline"}
                  onClick={() => {
                    setCompareMode(!compareMode);
                    if (!compareMode) setSelectedForCompare([]);
                  }}
                  className="gap-2"
                >
                  <Scale className="w-4 h-4" />
                  {compareMode ? 'Cancel Compare' : 'Compare'}
                </Button>
                {compareMode && selectedForCompare.length >= 2 && (
                  <DiamondComparison
                    diamonds={selectedForCompare}
                    onClose={() => {
                      setCompareMode(false);
                      setSelectedForCompare([]);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </motion.div>

        {wishlistDiamonds.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Heart className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-playfair font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Start adding diamonds you love!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistDiamonds.map((diamond, index) => (
              <motion.div
                key={diamond.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {compareMode && (
                  <div className="absolute top-4 left-4 z-10">
                    <input
                      type="checkbox"
                      checked={selectedForCompare.find(d => d.id === diamond.id) !== undefined}
                      onChange={() => handleCompareToggle(diamond)}
                      className="w-6 h-6 rounded border-2 border-accent accent-accent cursor-pointer"
                      disabled={selectedForCompare.length >= 4 && !selectedForCompare.find(d => d.id === diamond.id)}
                    />
                  </div>
                )}
                <DiamondCard diamond={diamond} onView={onViewDetails} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};