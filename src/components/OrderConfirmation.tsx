import { motion } from "framer-motion";
import { CheckCircle2, Package, Clock, Truck, Home } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { LuxuryButton } from "./ui/luxury-button";
import type { Diamond } from "./DiamondCard";
import dnoLogo from "@/assets/dno-logo.png";

interface OrderConfirmationProps {
  diamond: Diamond;
  orderDetails: {
    orderId: string;
    estimatedDelivery: string;
  };
  onContinueShopping: () => void;
}

export const OrderConfirmation = ({ diamond, orderDetails, onContinueShopping }: OrderConfirmationProps) => {
  return (
    <div className="min-h-screen bg-gradient-luxury flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.8,
          type: "spring",
          stiffness: 100
        }}
        className="w-full max-w-2xl"
      >
        <Card className="p-12 bg-card/95 backdrop-blur-sm border-accent/20 shadow-luxury text-center">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto" />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 w-24 h-24 border-4 border-green-500 rounded-full"
              />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-playfair font-bold text-accent mb-4">
              Order Successfully Placed! 🎉
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Thank you for choosing D&O Collections
            </p>
            <p className="text-lg text-foreground">
              Your exquisite <span className="text-accent font-semibold">{diamond.name}</span> is being prepared for delivery
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-8 p-6 bg-background/50 rounded-xl border border-accent/20"
          >
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-accent" />
                  <h3 className="font-playfair font-semibold text-foreground">Order Details</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="font-mono text-accent font-semibold mb-3">{orderDetails.orderId}</p>
                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                <p className="text-xl font-playfair font-bold text-accent">
                  ₹{diamond.price.toLocaleString('en-IN')}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="w-5 h-5 text-accent" />
                  <h3 className="font-playfair font-semibold text-foreground">Delivery Info</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                <p className="font-semibold text-foreground mb-3">{orderDetails.estimatedDelivery}</p>
                <p className="text-sm text-muted-foreground mb-1">Delivery Window</p>
                <p className="text-sm text-foreground">10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between text-center">
              <div className="flex-1">
                <div className="w-8 h-8 bg-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
                </div>
                <p className="text-xs text-accent font-semibold">Order Placed</p>
              </div>
              
              <div className="flex-1 h-px bg-accent/30 mx-2"></div>
              
              <div className="flex-1">
                <div className="w-8 h-8 border-2 border-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Package className="w-4 h-4 text-accent" />
                </div>
                <p className="text-xs text-muted-foreground">Processing</p>
              </div>
              
              <div className="flex-1 h-px bg-border mx-2"></div>
              
              <div className="flex-1">
                <div className="w-8 h-8 border-2 border-border rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">In Transit</p>
              </div>
              
              <div className="flex-1 h-px bg-border mx-2"></div>
              
              <div className="flex-1">
                <div className="w-8 h-8 border-2 border-border rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Home className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">Delivered</p>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="space-y-4"
          >
            <LuxuryButton
              variant="luxury"
              size="lg"
              onClick={onContinueShopping}
              className="w-full"
            >
              Continue Shopping
            </LuxuryButton>
            
            <p className="text-sm text-muted-foreground">
              You will receive order updates via email and SMS
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};