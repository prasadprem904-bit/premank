import { motion } from "framer-motion";
import { ArrowLeft, Star, Award, Shield, Truck } from "lucide-react";
import { LuxuryButton } from "./ui/luxury-button";
import { SoundButton } from "./ui/SoundButton";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useSound } from "@/hooks/useSound";
import type { Diamond } from "./DiamondCard";

interface DiamondDetailsProps {
  diamond: Diamond;
  onBack: () => void;
  onBuyNow: (diamond: Diamond) => void;
}

export const DiamondDetails = ({ diamond, onBack, onBuyNow }: DiamondDetailsProps) => {
  const paymentMethods = [
    "PhonePe", "Paytm", "UPI", "Cash on Delivery", "Credit Card", "Debit Card"
  ];
  const { playDiamondSparkle } = useSound();

  return (
    <div className="min-h-screen bg-gradient-luxury">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card/95 backdrop-blur-sm border-b border-accent/20 shadow-luxury sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4">
          <LuxuryButton 
            variant="ghost" 
            onClick={onBack}
            className="gap-2 text-foreground hover:text-accent"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collection
          </LuxuryButton>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Diamond Image */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="relative diamond-shine rounded-xl overflow-hidden">
                <SoundButton
                  onClick={() => playDiamondSparkle()}
                  className="w-full bg-transparent border-none p-0"
                  soundType="sparkle"
                >
                  <motion.img
                    src={diamond.image}
                    alt={diamond.name}
                    className="w-full h-96 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </SoundButton>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/70 px-3 py-2 rounded-full">
                  <Star className="w-4 h-4 text-accent fill-current" />
                  <span className="text-white font-medium">{diamond.rating}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <Award className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Certified</p>
                  <p className="font-semibold text-foreground">GIA</p>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <Shield className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Warranty</p>
                  <p className="font-semibold text-foreground">Lifetime</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Diamond Details */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Title & Price */}
            <div>
              <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">
                {diamond.name}
              </h1>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-5xl font-playfair font-bold text-accent">
                  ₹{diamond.price.toLocaleString('en-IN')}
                </span>
                <Badge variant="secondary" className="text-sm">
                  Premium Quality
                </Badge>
              </div>
            </div>

            {/* Specifications */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20">
              <h3 className="text-xl font-playfair font-semibold mb-4 text-foreground">
                Diamond Specifications
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Carat Weight</p>
                  <p className="text-lg font-semibold text-accent">{diamond.carat} CT</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Cut Grade</p>
                  <p className="text-lg font-semibold text-accent">{diamond.cut}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Color Grade</p>
                  <p className="text-lg font-semibold text-accent">{diamond.color}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Clarity Grade</p>
                  <p className="text-lg font-semibold text-accent">{diamond.clarity}</p>
                </div>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20">
              <h3 className="text-xl font-playfair font-semibold mb-4 text-foreground">
                Payment Options
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="flex items-center gap-2 p-3 bg-background/50 rounded-lg border border-border"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm font-medium text-foreground">{method}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Delivery Info */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20">
              <div className="flex items-center gap-3 mb-3">
                <Truck className="w-6 h-6 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">Delivery Information</h3>
              </div>
              <p className="text-muted-foreground mb-2">
                Free premium delivery within 3-5 business days
              </p>
              <p className="text-sm text-muted-foreground">
                Delivery time: 10:00 AM - 6:00 PM • Secure packaging included
              </p>
            </Card>

            {/* Buy Now Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LuxuryButton
                variant="luxury"
                size="xl"
                className="w-full text-xl py-6"
                onClick={() => onBuyNow(diamond)}
              >
                Buy Now - Complete Purchase
              </LuxuryButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};