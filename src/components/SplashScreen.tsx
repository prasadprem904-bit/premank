import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gem, Sparkles } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 500);
    const timer2 = setTimeout(() => setShowText(true), 1200);
    const timer3 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-luxury flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background sparkles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative text-center">
        {/* Diamond Logo Animation */}
        {showLogo && (
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }}
            className="mb-8 relative"
          >
            <div className="relative inline-block">
              <Gem className="w-24 h-24 text-accent drop-shadow-2xl" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="w-8 h-8 text-accent/60" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -left-4"
              >
                <Sparkles className="w-6 h-6 text-accent/40" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Brand Text Animation */}
        {showText && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            <motion.h1 
              className="text-6xl font-playfair font-bold text-accent mb-2"
              animate={{ 
                textShadow: [
                  "0 0 20px hsl(45 100% 50% / 0.5)",
                  "0 0 40px hsl(45 100% 50% / 0.8)",
                  "0 0 20px hsl(45 100% 50% / 0.5)"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              PR.COLLECTION
            </motion.h1>
            <motion.p 
              className="text-xl text-accent/80 font-inter tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              LUXURY • BRILLIANCE • ELEGANCE
            </motion.p>
          </motion.div>
        )}

        {/* Loading indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute -bottom-16 left-0 h-1 bg-gradient-gold rounded-full shadow-gold"
        />
      </div>
    </div>
  );
};