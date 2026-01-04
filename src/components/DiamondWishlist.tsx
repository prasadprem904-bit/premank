import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Heart, Scale, ArrowLeft, RefreshCw, Undo2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { DiamondCard, Diamond } from './DiamondCard';
import { Button } from './ui/button';
import { DiamondComparison } from './DiamondComparison';
import { toast } from '@/hooks/use-toast';
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
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  const undoTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const pendingRemovals = useRef<Map<string, Diamond>>(new Map());

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

  const handleRemoveFromWishlist = async (diamondId: string) => {
    if (!user) return;
    
    // Find the diamond being removed for undo
    const diamondToRemove = wishlistDiamonds.find(d => d.id === diamondId);
    if (!diamondToRemove) return;
    
    // Store for potential undo
    pendingRemovals.current.set(diamondId, diamondToRemove);
    
    // Add to removing set for animation
    setRemovingIds(prev => new Set(prev).add(diamondId));
    
    // Remove from UI immediately
    setTimeout(() => {
      setWishlistDiamonds(prev => prev.filter(d => d.id !== diamondId));
      setSelectedForCompare(prev => prev.filter(d => d.id !== diamondId));
      setRemovingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(diamondId);
        return newSet;
      });
    }, 300);
    
    // Show undo toast
    const { dismiss } = toast({
      title: "Diamond removed",
      description: (
        <div className="flex items-center justify-between gap-4">
          <span>"{diamondToRemove.name}" removed from wishlist</span>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-gold/50 text-gold hover:bg-gold/10"
            onClick={() => {
              handleUndoRemove(diamondId);
              dismiss();
            }}
          >
            <Undo2 className="w-3.5 h-3.5" />
            Undo
          </Button>
        </div>
      ),
      duration: 5000,
    });
    
    // Set timeout to actually delete from database after 5 seconds
    const timeout = setTimeout(async () => {
      try {
        await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user.id)
          .eq('diamond_id', diamondId);
      } catch (error) {
        console.error('Error removing from wishlist:', error);
      } finally {
        pendingRemovals.current.delete(diamondId);
        undoTimeouts.current.delete(diamondId);
      }
    }, 5000);
    
    undoTimeouts.current.set(diamondId, timeout);
  };
  
  const handleUndoRemove = (diamondId: string) => {
    // Clear the pending deletion timeout
    const timeout = undoTimeouts.current.get(diamondId);
    if (timeout) {
      clearTimeout(timeout);
      undoTimeouts.current.delete(diamondId);
    }
    
    // Restore the diamond to the list
    const diamond = pendingRemovals.current.get(diamondId);
    if (diamond) {
      setWishlistDiamonds(prev => [...prev, diamond]);
      pendingRemovals.current.delete(diamondId);
      
      toast({
        title: "Restored",
        description: `"${diamond.name}" has been restored to your wishlist`,
        duration: 2000,
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background pt-20 sm:pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-playfair font-bold mb-4">Your Wishlist</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Please sign in to view your wishlist</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 sm:pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-gold mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold mb-4">Loading Wishlist...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-background pt-20 sm:pt-32 px-4 sm:px-6 lg:px-8 pb-24 md:pb-12 touch-pan-y overflow-hidden"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.5, bottom: 0 }}
      style={{ y: pullY }}
      onDragEnd={handleDragEnd}
    >
      {/* Pull to refresh indicator */}
      <motion.div 
        className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
        style={{ opacity: pullOpacity }}
      >
        <motion.div
          style={{ rotate: pullRotation }}
          className="p-2 sm:p-3 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30"
        >
          <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 text-gold ${refreshing ? 'animate-spin' : ''}`} />
        </motion.div>
        <span className="text-[10px] sm:text-xs text-gold font-medium">
          {refreshing ? 'Refreshing...' : 'Pull to refresh'}
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <motion.button
            onClick={onBack}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 sm:gap-3 text-gold hover:text-gold-light transition-all duration-300 mb-4 py-2 px-3 sm:px-4 rounded-xl bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold/50 shadow-sm hover:shadow-gold min-h-[44px]"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium tracking-wide text-sm sm:text-base">Back</span>
          </motion.button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold mb-1 sm:mb-2">My Wishlist</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                {wishlistDiamonds.length} {wishlistDiamonds.length === 1 ? 'diamond' : 'diamonds'} saved
              </p>
            </div>
            
            {wishlistDiamonds.length > 1 && (
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant={compareMode ? "default" : "outline"}
                  onClick={() => {
                    setCompareMode(!compareMode);
                    if (!compareMode) setSelectedForCompare([]);
                  }}
                  className="gap-2 flex-1 sm:flex-none min-h-[44px]"
                >
                  <Scale className="w-4 h-4" />
                  <span className="hidden sm:inline">{compareMode ? 'Cancel Compare' : 'Compare'}</span>
                  <span className="sm:hidden">{compareMode ? 'Cancel' : 'Compare'}</span>
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
            className="text-center py-12 sm:py-16"
          >
            <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground mx-auto mb-4 sm:mb-6" />
            <h2 className="text-xl sm:text-2xl font-playfair font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">Start adding diamonds you love!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {wishlistDiamonds.map((diamond, index) => (
                <motion.div
                  key={diamond.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ 
                    opacity: removingIds.has(diamond.id) ? 0 : 1, 
                    y: removingIds.has(diamond.id) ? -20 : 0,
                    x: removingIds.has(diamond.id) ? 100 : 0,
                    scale: removingIds.has(diamond.id) ? 0.8 : 1
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: 100, 
                    scale: 0.8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    layout: { type: "spring", stiffness: 300, damping: 30 }
                  }}
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
                  
                  {/* Remove from wishlist button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveFromWishlist(diamond.id)}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-red-500/90 hover:bg-red-600 shadow-lg backdrop-blur-sm transition-colors"
                    title="Remove from wishlist"
                  >
                    <Heart className="w-4 h-4 text-white fill-white" />
                  </motion.button>
                  
                  <DiamondCard diamond={diamond} onView={onViewDetails} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};