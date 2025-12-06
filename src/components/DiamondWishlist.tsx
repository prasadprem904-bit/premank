import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Heart, Scale, ArrowLeft, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { DiamondCard, Diamond } from './DiamondCard';
import { Button } from './ui/button';
import { DiamondComparison } from './DiamondComparison';
import heroDiamond from '@/assets/hero-diamond.jpg';

interface DiamondWishlistProps {
  onViewDetails: (diamond: Diamond) => void;
  onBack: () => void;
}

export const DiamondWishlist = ({ onViewDetails, onBack }: DiamondWishlistProps) => {
  const { user } = useAuth();
  const [wishlistDiamonds, setWishlistDiamonds] = useState<Diamond[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<Diamond[]>([]);

  // Pull to refresh
  const pullY = useMotionValue(0);
  const pullProgress = useTransform(pullY, [0, 80], [0, 1]);
  const pullRotation = useTransform(pullY, [0, 80], [0, 360]);
  const pullOpacity = useTransform(pullY, [0, 40, 80], [0, 0.5, 1]);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchWishlist = async () => {
    if (!user) return;

    try {
      setLoading(true);
      // Fetch wishlist items with their diamond details
      const { data: wishlistData, error: wishlistError } = await supabase
        .from('wishlist')
        .select('diamond_id')
        .eq('user_id', user.id);

      if (wishlistError) throw wishlistError;

      if (wishlistData && wishlistData.length > 0) {
        const diamondIds = wishlistData.map(item => item.diamond_id);
        
        // Fetch actual diamond details from database
        const { data: diamondsData, error: diamondsError } = await supabase
          .from('diamonds')
          .select('*')
          .in('id', diamondIds);

        if (diamondsError) throw diamondsError;

        if (diamondsData) {
          const mappedDiamonds: Diamond[] = diamondsData.map(d => ({
            id: d.id,
            name: d.name,
            price: Number(d.price),
            carat: Number(d.carat),
            cut: d.description || "Round Brilliant",
            color: d.color,
            clarity: d.clarity,
            image: d.image_url || heroDiamond,
            rating: 4.8,
            certification: (d.certification_status === "GIA" || d.certification_status === "IGI") ? d.certification_status : undefined,
          }));
          setWishlistDiamonds(mappedDiamonds);
        }
      } else {
        setWishlistDiamonds([]);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlistDiamonds([]);
    } finally {
      setLoading(false);
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

  const handlePullRefresh = async () => {
    if (refreshing || !user) return;
    setRefreshing(true);
    await fetchWishlist();
    setRefreshing(false);
    animate(pullY, 0, { type: 'spring', stiffness: 400, damping: 30 });
  };

  const handleDragEnd = () => {
    if (pullY.get() >= 80 && !refreshing) {
      handlePullRefresh();
    } else {
      animate(pullY, 0, { type: 'spring', stiffness: 400, damping: 30 });
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <Heart className="w-16 h-16 text-gold mx-auto mb-4" />
            <h2 className="text-3xl font-playfair font-bold mb-4">Loading Wishlist...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-background pt-32 px-4 pb-12 touch-pan-y overflow-hidden"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.5, bottom: 0 }}
      style={{ y: pullY }}
      onDragEnd={handleDragEnd}
    >
      {/* Pull to refresh indicator */}
      <motion.div 
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
        style={{ opacity: pullOpacity }}
      >
        <motion.div
          style={{ rotate: pullRotation }}
          className="p-3 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30"
        >
          <RefreshCw className={`w-5 h-5 text-gold ${refreshing ? 'animate-spin' : ''}`} />
        </motion.div>
        <span className="text-xs text-gold font-medium">
          {refreshing ? 'Refreshing...' : 'Pull to refresh'}
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <motion.button
            onClick={onBack}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 text-gold hover:text-gold-light transition-all duration-300 mb-4 py-2 px-4 rounded-xl bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold/50 shadow-sm hover:shadow-gold"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium tracking-wide">Back</span>
          </motion.button>
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
    </motion.div>
  );
};