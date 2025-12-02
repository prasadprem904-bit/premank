import { motion } from 'framer-motion';
import { X, Star, Award } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Diamond } from './DiamondCard';
import { useState } from 'react';

interface DiamondComparisonProps {
  diamonds: Diamond[];
  onClose: () => void;
}

export const DiamondComparison = ({ diamonds, onClose }: DiamondComparisonProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair flex items-center gap-2">
            Compare Diamonds
            <span className="text-sm text-muted-foreground font-normal">
              ({diamonds.length} selected)
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {diamonds.map((diamond, index) => (
            <motion.div
              key={diamond.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              {/* Diamond Image */}
              <div className="relative rounded-lg overflow-hidden aspect-square">
                <img
                  src={diamond.image}
                  alt={diamond.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-accent fill-current" />
                  <span className="text-xs text-white">{diamond.rating}</span>
                </div>
              </div>

              {/* Diamond Details */}
              <div className="space-y-3 bg-card p-4 rounded-lg border border-border">
                <div>
                  <h3 className="font-playfair font-semibold text-lg mb-1">{diamond.name}</h3>
                  {diamond.certification && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Award className="w-3 h-3" />
                      {diamond.certification} Certified
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-semibold text-accent">
                      ₹{diamond.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Carat</span>
                    <span className="font-medium">{diamond.carat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cut</span>
                    <span className="font-medium">{diamond.cut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Color</span>
                    <span className="font-medium">{diamond.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Clarity</span>
                    <span className="font-medium">{diamond.clarity}</span>
                  </div>
                </div>

                {/* Value Indicator */}
                <div className="pt-3 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-1">Value Score</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(diamond.rating / 5) * 100}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-accent to-accent/80"
                      />
                    </div>
                    <span className="text-xs font-medium">{Math.round((diamond.rating / 5) * 100)}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose}>
            Close Comparison
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};