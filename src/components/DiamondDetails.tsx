import { motion } from "framer-motion";
import { ArrowLeft, Shield, Truck, Award, Star, Gem, FileText, Ruler, Sparkles, Eye, Zap, Package, MapPin } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { LuxuryButton } from "./ui/luxury-button";
import { Diamond3DViewer } from "./Diamond3DViewer";
import { Separator } from "./ui/separator";
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

  // Generate detailed specifications
  const detailedSpecs = {
    shape: "Round Brilliant",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    measurements: `${(diamond.carat * 6.5).toFixed(2)} × ${(diamond.carat * 6.5).toFixed(2)} × ${(diamond.carat * 3.9).toFixed(2)} mm`,
    tablePercent: "57%",
    depthPercent: "61.5%",
    girdle: "Medium to Slightly Thick",
    culet: "None",
    certificateNumber: `GIA-${Math.floor(Math.random() * 9000000) + 1000000}`,
    origin: "Natural",
    treatment: "None",
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
            Back to Collection
          </LuxuryButton>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 3D Diamond Viewer */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="relative rounded-xl overflow-hidden h-[500px]">
                <Diamond3DViewer diamondName={diamond.name} />
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

            {/* Main Specifications - 4Cs */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20">
              <div className="flex items-center gap-2 mb-4">
                <Gem className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-playfair font-semibold text-foreground">
                  The 4Cs - Primary Grading
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-background/50 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Carat Weight</p>
                  <p className="text-2xl font-bold text-accent">{diamond.carat} CT</p>
                  <p className="text-xs text-muted-foreground mt-1">Weight measurement</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Cut Grade</p>
                  <p className="text-2xl font-bold text-accent">{diamond.cut}</p>
                  <p className="text-xs text-muted-foreground mt-1">Quality of cut</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Color Grade</p>
                  <p className="text-2xl font-bold text-accent">{diamond.color}</p>
                  <p className="text-xs text-muted-foreground mt-1">Color scale D-Z</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Clarity Grade</p>
                  <p className="text-2xl font-bold text-accent">{diamond.clarity}</p>
                  <p className="text-xs text-muted-foreground mt-1">Inclusion visibility</p>
                </div>
              </div>
            </Card>

            {/* Detailed Specifications */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20">
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-playfair font-semibold text-foreground">
                  Detailed Specifications
                </h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Shape</p>
                    <p className="font-semibold text-foreground">{detailedSpecs.shape}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Measurements</p>
                    <p className="font-semibold text-foreground">{detailedSpecs.measurements}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Table %</p>
                    <p className="font-semibold text-foreground">{detailedSpecs.tablePercent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Depth %</p>
                    <p className="font-semibold text-foreground">{detailedSpecs.depthPercent}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Polish</p>
                    <p className="font-semibold text-accent">{detailedSpecs.polish}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Symmetry</p>
                    <p className="font-semibold text-accent">{detailedSpecs.symmetry}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Girdle</p>
                    <p className="font-semibold text-foreground">{detailedSpecs.girdle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Culet</p>
                    <p className="font-semibold text-foreground">{detailedSpecs.culet}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Fluorescence</p>
                    <p className="font-semibold text-foreground">{detailedSpecs.fluorescence}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Origin</p>
                    <p className="font-semibold text-foreground">{detailedSpecs.origin}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Light Performance */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-playfair font-semibold text-foreground">
                  Light Performance
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Brilliance</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Fire</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Scintillation</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Certification Details */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-playfair font-semibold text-foreground">
                  Certification & Authentication
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-accent/20">
                  <Award className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">GIA Certified</p>
                    <p className="text-sm text-muted-foreground">Gemological Institute of America</p>
                    <p className="text-xs text-accent mt-2">Certificate #: {detailedSpecs.certificateNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-background/50 rounded-lg border border-border">
                    <Eye className="w-5 h-5 text-accent mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Treatment</p>
                    <p className="text-sm font-semibold text-foreground">{detailedSpecs.treatment}</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg border border-border">
                    <MapPin className="w-5 h-5 text-accent mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Source</p>
                    <p className="text-sm font-semibold text-foreground">Ethically Sourced</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Features */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-playfair font-semibold text-foreground">
                  What's Included
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  "Original GIA Certificate",
                  "Premium Jewelry Box",
                  "Lifetime Warranty Card",
                  "Care & Maintenance Guide",
                  "Authenticity Guarantee",
                  "Free Resizing (if applicable)",
                  "Insurance Valuation Report",
                  "Complimentary Cleaning Service"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
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