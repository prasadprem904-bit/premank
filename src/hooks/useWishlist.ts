import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export const useWishlist = () => {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlistIds(new Set());
      setLoading(false);
    }
  }, [user]);

  const fetchWishlist = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select('diamond_id')
        .eq('user_id', user.id);

      if (error) throw error;

      setWishlistIds(new Set(data?.map(item => item.diamond_id) || []));
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (diamondId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add diamonds to your wishlist",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('wishlist')
        .insert({ user_id: user.id, diamond_id: diamondId });

      if (error) throw error;

      setWishlistIds(prev => new Set([...prev, diamondId]));
      toast({
        title: "Added to wishlist",
        description: "Diamond saved to your wishlist",
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to add to wishlist",
        variant: "destructive",
      });
    }
  };

  const removeFromWishlist = async (diamondId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('diamond_id', diamondId);

      if (error) throw error;

      setWishlistIds(prev => {
        const next = new Set(prev);
        next.delete(diamondId);
        return next;
      });
      toast({
        title: "Removed from wishlist",
        description: "Diamond removed from your wishlist",
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove from wishlist",
        variant: "destructive",
      });
    }
  };

  const isInWishlist = (diamondId: string) => wishlistIds.has(diamondId);

  return {
    wishlistIds,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refetch: fetchWishlist,
  };
};