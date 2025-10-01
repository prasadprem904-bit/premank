import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gem, Sparkles } from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const { playShine, playNotification } = useSound();

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowLogo(true);
      playShine();
    }, 500);
    const timer2 = setTimeout(() => {
      setShowText(true);
      playNotification();
    }, 1200);
    const timer3 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete, playShine, playNotification]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #000000 0%, #0D47A1 30%, #000000 70%, #0D47A1 100%)'
    }}>
      {/* Glowing Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50" />
      
      {/* Premium Animated Sparkles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative text-center">
        {/* Shining Diamond Animation */}
        {showLogo && (
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut",
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="mb-8 relative"
          >
            <motion.div
              className="relative"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="absolute inset-0 w-32 h-32 mx-auto">
                <div className="w-full h-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-full blur-xl opacity-60" />
              </div>
              <Gem className="w-32 h-32 text-yellow-400 mx-auto relative z-10 filter drop-shadow-2xl" />
            </motion.div>
            
            {/* Premium Rotating Sparkles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 80px',
                  transform: `rotate(${i * 30}deg)`
                }}
                animate={{ 
                  rotate: [0, 360],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
              >
                <Sparkles className="w-3 h-3 text-yellow-300" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Welcome Text in Golden Font */}
        {showText && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-6"
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-playfair font-bold mb-4"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))'
              }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(255, 215, 0, 0.5)',
                  '0 0 30px rgba(255, 215, 0, 0.8)',
                  '0 0 20px rgba(255, 215, 0, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Welcome to D&O Collections
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl text-white font-light opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 1 }}
            >
              Pure. Precious. Perfect.
            </motion.p>
          </motion.div>
        )}

        {/* Premium Loading Bar */}
        <motion.div 
          className="mt-16 w-80 h-2 bg-black/30 rounded-full mx-auto overflow-hidden border border-yellow-400/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 relative"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 2.5,
              delay: 1.8,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};