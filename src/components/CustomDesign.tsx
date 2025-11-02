import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { LuxuryButton } from "./ui/luxury-button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import premankLogo from "@/assets/premank-logo.png";

interface CustomDesignProps {
  onBack: () => void;
}

export const CustomDesign = ({ onBack }: CustomDesignProps) => {
  const [carat, setCarat] = useState([2.0]);
  const [cut, setCut] = useState("Round Brilliant");
  const [color, setColor] = useState("D");
  const [clarity, setClarity] = useState("VVS1");
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");

  const cuts = ["Round Brilliant", "Princess", "Emerald", "Cushion", "Oval", "Radiant", "Asscher", "Pear"];
  const colors = ["D", "E", "F", "G", "H", "I", "J"];
  const clarities = ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"];

  const calculatePrice = () => {
    const basePrice = 50000;
    const caratPrice = carat[0] * basePrice;
    const cutMultiplier = cut === "Round Brilliant" ? 1.2 : 1.0;
    const colorMultiplier = 1.0 + (7 - colors.indexOf(color)) * 0.05;
    const clarityMultiplier = 1.0 + (7 - clarities.indexOf(clarity)) * 0.08;
    
    return Math.round(caratPrice * cutMultiplier * colorMultiplier * clarityMultiplier);
  };

  const handleSubmitDesign = () => {
    if (!name || !budget) {
      toast.error("Please fill in your name and budget");
      return;
    }

    toast.success("Custom design request submitted! Our experts will contact you within 24 hours.", {
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-luxury">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card/95 backdrop-blur-sm border-b border-accent/20 shadow-luxury sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <LuxuryButton variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </LuxuryButton>
            <div className="flex items-center gap-3">
              <img src={premankLogo} alt="Premank" className="w-10 h-10 object-contain diamond-shine" />
              <div>
                <h1 className="text-2xl font-playfair font-bold text-accent">Premank</h1>
                <p className="text-xs text-muted-foreground italic">Bright your own jewellery ✨</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Sparkles className="w-16 h-16 text-accent mx-auto mb-4" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-accent mb-4">
              Design Your Own Jewellery
            </h1>
            <p className="text-muted-foreground text-lg">
              Premank: Bright your own jewellery with expert craftsmanship ✨
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Design Controls */}
            <Card className="p-6 space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-4 block">Diamond Specifications</Label>
                
                {/* Carat */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <Label>Carat Weight</Label>
                    <span className="text-accent font-semibold">{carat[0].toFixed(2)} ct</span>
                  </div>
                  <Slider
                    value={carat}
                    onValueChange={setCarat}
                    min={0.5}
                    max={5.0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Cut */}
                <div className="space-y-2 mb-6">
                  <Label>Cut Style</Label>
                  <Select value={cut} onValueChange={setCut}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cuts.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Color */}
                <div className="space-y-2 mb-6">
                  <Label>Color Grade</Label>
                  <Select value={color} onValueChange={setColor}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c} - {c === "D" ? "Colorless" : c <= "F" ? "Near Colorless" : "Faint Color"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clarity */}
                <div className="space-y-2">
                  <Label>Clarity Grade</Label>
                  <Select value={clarity} onValueChange={setClarity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {clarities.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Your Details */}
              <div className="border-t border-border pt-6 space-y-4">
                <Label className="text-lg font-semibold block">Your Details</Label>
                
                <div className="space-y-2">
                  <Label>Your Name</Label>
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Budget (₹)</Label>
                  <Input
                    placeholder="Enter your budget"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
              </div>
            </Card>

            {/* Preview & Summary */}
            <div className="space-y-6">
              {/* Preview */}
              <Card className="p-6">
                <h3 className="text-xl font-playfair font-semibold mb-4">Preview</h3>
                <motion.div
                  className="relative w-full aspect-square bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center mb-6"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="text-8xl"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    💎
                  </motion.div>
                </motion.div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Carat:</span>
                    <span className="font-semibold">{carat[0].toFixed(2)} ct</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cut:</span>
                    <span className="font-semibold">{cut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Color:</span>
                    <span className="font-semibold">{color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Clarity:</span>
                    <span className="font-semibold">{clarity}</span>
                  </div>
                </div>
              </Card>

              {/* Estimated Price */}
              <Card className="p-6 bg-gradient-gold">
                <h3 className="text-xl font-playfair font-semibold text-accent-foreground mb-4">
                  Estimated Price
                </h3>
                <div className="text-4xl font-bold text-accent-foreground mb-2">
                  ₹{calculatePrice().toLocaleString('en-IN')}
                </div>
                <p className="text-accent-foreground/80 text-sm">
                  Final price may vary based on availability and current market rates
                </p>
              </Card>

              {/* Submit Button */}
              <LuxuryButton
                variant="luxury"
                size="lg"
                className="w-full"
                onClick={handleSubmitDesign}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Submit Design Request
              </LuxuryButton>

              <p className="text-center text-sm text-muted-foreground">
                Our diamond experts will review your design and contact you within 24 hours
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
