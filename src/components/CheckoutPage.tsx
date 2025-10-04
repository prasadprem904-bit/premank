import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Smartphone, Wallet, DollarSign, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";
import { LuxuryButton } from "./ui/luxury-button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import type { Diamond } from "./DiamondCard";
import { toast } from "sonner";

interface CheckoutPageProps {
  diamond: Diamond;
  onBack: () => void;
  onPaymentComplete: () => void;
}

export const CheckoutPage = ({ diamond, onBack, onPaymentComplete }: CheckoutPageProps) => {
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [amount, setAmount] = useState<string>(diamond.price.toString());

  const paymentOptions = [
    {
      id: "phonepe",
      name: "PhonePe",
      icon: <Smartphone className="w-5 h-5" />,
      description: "Pay using PhonePe UPI",
    },
    {
      id: "paytm",
      name: "Paytm",
      icon: <Wallet className="w-5 h-5" />,
      description: "Pay using Paytm wallet or UPI",
    },
    {
      id: "upi",
      name: "UPI",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Pay using any UPI app",
    },
    {
      id: "gpay",
      name: "Google Pay",
      icon: <Smartphone className="w-5 h-5" />,
      description: "Pay using Google Pay",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: <DollarSign className="w-5 h-5" />,
      description: "Pay when you receive",
    },
  ];

  const handlePayment = () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }

    const paymentAmount = parseFloat(amount);
    if (!amount || isNaN(paymentAmount) || paymentAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (paymentAmount < diamond.price) {
      toast.error(`Amount must be at least ₹${diamond.price.toLocaleString('en-IN')}`);
      return;
    }
    
    toast.success(`Payment of ₹${paymentAmount.toLocaleString('en-IN')} initiated successfully via ${paymentOptions.find(p => p.id === selectedPayment)?.name}!`);
    setTimeout(() => {
      onPaymentComplete();
    }, 1500);
  };

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
            Back to Details
          </LuxuryButton>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-playfair font-bold text-foreground mb-2">
              Complete Your Purchase
            </h1>
            <p className="text-muted-foreground">
              You're one step away from owning this magnificent diamond
            </p>
          </div>

          {/* Diamond Summary Card */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Diamond Image */}
              <div className="relative">
                <div className="diamond-shine rounded-xl overflow-hidden">
                  <img
                    src={diamond.image}
                    alt={diamond.name}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Diamond Details */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">
                    {diamond.name}
                  </h2>
                  <Badge variant="secondary" className="mb-4">Premium Quality</Badge>
                </div>

                <Separator />

                {/* Specifications */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Carat</span>
                    <span className="text-sm font-semibold text-foreground">{diamond.carat} CT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Cut</span>
                    <span className="text-sm font-semibold text-foreground">{diamond.cut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Color</span>
                    <span className="text-sm font-semibold text-foreground">{diamond.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Clarity</span>
                    <span className="text-sm font-semibold text-foreground">{diamond.clarity}</span>
                  </div>
                </div>

                <Separator />

                {/* Price */}
                <div className="bg-background/50 p-4 rounded-lg border border-accent/20">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-muted-foreground">Total Amount</span>
                    <span className="text-3xl font-playfair font-bold text-accent">
                      ₹{diamond.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Method Selection */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">
              Select Payment Method
            </h3>

            <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
              <div className="space-y-4">
                {paymentOptions.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Label
                      htmlFor={option.id}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPayment === option.id
                          ? "border-accent bg-accent/10"
                          : "border-border bg-background/50 hover:border-accent/50"
                      }`}
                    >
                      <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                      <div className="flex-1 flex items-start gap-3">
                        <div className="p-2 bg-accent/20 rounded-lg text-accent">
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground mb-1">{option.name}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                        {selectedPayment === option.id && (
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                        )}
                      </div>
                    </Label>
                  </motion.div>
                ))}
              </div>
            </RadioGroup>
          </Card>

          {/* Amount Input */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">
              Enter Payment Amount
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount" className="text-sm font-medium text-foreground mb-2 block">
                  Amount (₹)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 text-lg font-semibold"
                    placeholder="Enter amount"
                    min={diamond.price}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Minimum amount: ₹{diamond.price.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </Card>

          {/* Delivery Information */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
            <h3 className="text-lg font-semibold text-foreground mb-4">Delivery Information</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Free premium delivery within 3-5 business days</p>
              <p>✓ Secure and insured packaging</p>
              <p>✓ Track your order in real-time</p>
              <p>✓ Signature required on delivery</p>
            </div>
          </Card>

          {/* Continue Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LuxuryButton
              variant="luxury"
              size="xl"
              className="w-full text-xl py-6"
              onClick={handlePayment}
              disabled={!selectedPayment || !amount}
            >
              Proceed to Payment - ₹{amount ? parseFloat(amount).toLocaleString('en-IN') : '0'}
            </LuxuryButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
