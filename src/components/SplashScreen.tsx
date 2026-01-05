import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import premankLogo from "@/assets/premank-logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowLogo(true);
    }, 500);
    const timer2 = setTimeout(() => {
      setShowText(true);
    }, 1200);
    const timer3 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0B1736 0%, #1a237e 30%, #0B1736 70%, #1a237e 100%)'
    }}>
      {/* Luxury Glowing Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 opacity-60" />
      
      {/* Animated Golden Lines - Luxury Reveal */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-px bg-gradient-to-b from-transparent via-yellow-400 to-transparent"
          initial={{ height: "0%" }}
          animate={{ height: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        />
      </motion.div>
      
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
        {/* Shining Diamond Animation with Shine Effect */}
        {showLogo && (
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ 
              duration: 1.5, 
              ease: "easeOut",
              type: "spring",
              stiffness: 150,
              damping: 12
            }}
            className="mb-8 relative"
          >
            <motion.div
              className="relative"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.03, 1]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Enhanced Glow Effect */}
              <div className="absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto">
                <motion.div 
                  className="w-full h-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-full blur-2xl"
                  animate={{ 
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Logo with Shine Effect */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto overflow-hidden rounded-full">
                <img src={premankLogo} alt="Premank" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 relative z-10 filter drop-shadow-2xl object-contain" />
                
                {/* Diamond Shine Animation - Light Reflection */}
                <motion.div
                  className="absolute inset-0 z-20"
                  initial={{ x: "-100%", rotate: 20 }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
                    width: '50%',
                    height: '200%',
                    top: '-50%',
                  }}
                />
              </div>
            </motion.div>
            
            {/* Premium Rotating Sparkles - Hidden on very small screens */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 sm:w-3 sm:h-3 hidden sm:block"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 60px',
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
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-300 rounded-full"></div>
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
              className="text-3xl sm:text-5xl md:text-7xl font-playfair font-bold mb-4 px-4"
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
              Welcome to Premank
            </motion.h1>
            <motion.p 
              className="text-base sm:text-xl md:text-3xl text-white font-light opacity-90 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 1 }}
            >
              Bright your own jewellery ✨
            </motion.p>
          </motion.div>
        )}

        {/* Premium Loading Bar */}
        <motion.div 
          className="mt-8 sm:mt-16 w-48 sm:w-64 md:w-80 h-1.5 sm:h-2 bg-black/30 rounded-full mx-auto overflow-hidden border border-yellow-400/30"
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