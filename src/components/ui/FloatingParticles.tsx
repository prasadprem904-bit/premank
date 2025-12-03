import { motion } from "framer-motion";

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export const FloatingParticles = ({ count = 20, className = "" }: FloatingParticlesProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0,
          }}
          animate={{
            y: [null, `${Math.random() * 100}%`],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          <span 
            className="text-primary"
            style={{ 
              fontSize: `${Math.random() * 12 + 8}px`,
              filter: 'drop-shadow(0 0 6px hsl(var(--primary)))'
            }}
          >
            ✦
          </span>
        </motion.div>
      ))}
    </div>
  );
};
