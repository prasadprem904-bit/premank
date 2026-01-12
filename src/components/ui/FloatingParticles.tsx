import { motion } from "framer-motion";

interface FloatingParticlesProps {
  count?: number;
  className?: string;
  variant?: "sparkle" | "diamond" | "mixed";
}

const particleShapes = {
  sparkle: "✦",
  diamond: "◇",
  star: "★",
  dot: "•"
};

export const FloatingParticles = ({ 
  count = 20, 
  className = "", 
  variant = "mixed" 
}: FloatingParticlesProps) => {
  const getShape = (index: number) => {
    if (variant === "sparkle") return particleShapes.sparkle;
    if (variant === "diamond") return particleShapes.diamond;
    
    // Mixed variant
    const shapes = [particleShapes.sparkle, particleShapes.diamond, particleShapes.star, particleShapes.dot];
    return shapes[index % shapes.length];
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 14 + 8;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 8;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: `${startX}%`,
              y: `${startY}%`,
              scale: 0,
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              y: [`${startY}%`, `${startY - 30}%`, `${startY}%`],
              x: [`${startX}%`, `${startX + (Math.random() - 0.5) * 10}%`, `${startX}%`],
              opacity: [0, 0.9, 0],
              scale: [0.3, 1, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
          >
            <span 
              className="text-primary block"
              style={{ 
                fontSize: `${size}px`,
                filter: `drop-shadow(0 0 ${size / 2}px hsl(var(--primary)))`,
                textShadow: '0 0 10px hsl(var(--primary) / 0.5)'
              }}
            >
              {getShape(i)}
            </span>
          </motion.div>
        );
      })}
      
      {/* Additional glowing orbs */}
      {Array.from({ length: Math.floor(count / 4) }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-primary/20 blur-xl"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
          }}
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: Math.random() * 8 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
