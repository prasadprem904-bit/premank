import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LuxurySpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LuxurySpinner = ({ size = "md", className }: LuxurySpinnerProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <div className={cn("relative flex items-center justify-center", sizeClasses[size], className)}>
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Middle spinning ring */}
      <motion.div
        className="absolute inset-1 rounded-full border-2 border-transparent border-t-primary border-r-primary/50"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner diamond shape */}
      <motion.div
        className="absolute"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg 
          viewBox="0 0 24 24" 
          className={cn(
            "text-primary fill-current",
            size === "sm" ? "w-3 h-3" : size === "md" ? "w-5 h-5" : "w-8 h-8"
          )}
        >
          <path d="M12 2L2 9l10 13 10-13L12 2z" />
        </svg>
      </motion.div>
      
      {/* Sparkle effects */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: [0, Math.cos((i * Math.PI) / 2) * 30, 0],
            y: [0, Math.sin((i * Math.PI) / 2) * 30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

interface LuxuryLoadingScreenProps {
  message?: string;
}

export const LuxuryLoadingScreen = ({ message = "Loading..." }: LuxuryLoadingScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <LuxurySpinner size="lg" />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-lg font-playfair text-muted-foreground"
      >
        {message}
      </motion.p>
      <motion.div
        className="mt-4 flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary/60 rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
