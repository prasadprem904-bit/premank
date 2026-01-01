import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type AnimationDirection = "up" | "down" | "left" | "right" | "fade" | "scale" | "blur";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  stagger?: boolean;
  staggerDelay?: number;
}

const getVariants = (direction: AnimationDirection): Variants => {
  const variants: Record<AnimationDirection, Variants> = {
    up: {
      hidden: { opacity: 0, y: 60, filter: "blur(4px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    down: {
      hidden: { opacity: 0, y: -60, filter: "blur(4px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    left: {
      hidden: { opacity: 0, x: -60, filter: "blur(4px)" },
      visible: { opacity: 1, x: 0, filter: "blur(0px)" },
    },
    right: {
      hidden: { opacity: 0, x: 60, filter: "blur(4px)" },
      visible: { opacity: 1, x: 0, filter: "blur(0px)" },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8, filter: "blur(4px)" },
      visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  };

  return variants[direction];
};

export const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  amount = 0.2,
}: ScrollRevealProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants(direction)}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation wrapper
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  amount?: number;
}

export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
  amount = 0.2,
}: StaggerContainerProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: AnimationDirection;
}

export const StaggerItem = ({
  children,
  className = "",
  direction = "up",
}: StaggerItemProps) => {
  return (
    <motion.div
      variants={getVariants(direction)}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Text reveal animation (word by word or character by character)
interface TextRevealProps {
  text: string;
  className?: string;
  type?: "word" | "char";
  delay?: number;
}

export const TextReveal = ({
  text,
  className = "",
  type = "word",
  delay = 0,
}: TextRevealProps) => {
  const items = type === "word" ? text.split(" ") : text.split("");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: type === "word" ? 0.08 : 0.03,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="inline-block"
        >
          {item}
          {type === "word" && index < items.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Counter animation
interface CounterRevealProps {
  value: number | string;
  className?: string;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export const CounterReveal = ({
  value,
  className = "",
  duration = 2,
  suffix = "",
  prefix = "",
}: CounterRevealProps) => {
  const numericValue = typeof value === "string" ? parseInt(value.replace(/\D/g, "")) : value;

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={className}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {typeof value === "string" ? value : numericValue.toLocaleString()}
        </motion.span>
      </motion.span>
      {suffix}
    </motion.span>
  );
};
