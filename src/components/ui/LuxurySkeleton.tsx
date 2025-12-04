import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LuxurySkeletonProps {
  className?: string;
}

export const LuxurySkeleton = ({ className }: LuxurySkeletonProps) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-lg bg-secondary/50",
        className
      )}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export const DiamondCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-luxury p-0 overflow-hidden"
    >
      {/* Image skeleton */}
      <LuxurySkeleton className="w-full h-64 rounded-t-2xl rounded-b-none" />
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <LuxurySkeleton className="h-6 w-3/4" />
        
        {/* Price */}
        <LuxurySkeleton className="h-8 w-1/2" />
        
        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3">
          <LuxurySkeleton className="h-12 rounded-xl" />
          <LuxurySkeleton className="h-12 rounded-xl" />
        </div>
        
        {/* Button */}
        <LuxurySkeleton className="h-12 w-full rounded-xl" />
      </div>
    </motion.div>
  );
};

export const DiamondGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <DiamondCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
};

export const HeroSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center pt-20 relative">
      {/* Background skeleton */}
      <LuxurySkeleton className="absolute inset-0" />
      
      {/* Content skeleton */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl space-y-6">
          {/* Badge */}
          <LuxurySkeleton className="h-10 w-64 rounded-full" />
          
          {/* Title */}
          <LuxurySkeleton className="h-20 w-full max-w-2xl" />
          <LuxurySkeleton className="h-20 w-3/4" />
          
          {/* Description */}
          <LuxurySkeleton className="h-6 w-full max-w-xl" />
          <LuxurySkeleton className="h-6 w-3/4 max-w-lg" />
          
          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <LuxurySkeleton className="h-14 w-48 rounded-xl" />
            <LuxurySkeleton className="h-14 w-48 rounded-xl" />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 max-w-lg">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <LuxurySkeleton className="h-10 w-full" />
                <LuxurySkeleton className="h-4 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <LuxurySkeleton className="w-20 h-20 rounded-full" />
        <div className="space-y-2 flex-1">
          <LuxurySkeleton className="h-6 w-48" />
          <LuxurySkeleton className="h-4 w-32" />
        </div>
      </div>
      
      {/* Form fields */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <LuxurySkeleton className="h-4 w-24" />
          <LuxurySkeleton className="h-12 w-full rounded-xl" />
        </div>
      ))}
      
      {/* Button */}
      <LuxurySkeleton className="h-12 w-full rounded-xl" />
    </div>
  );
};

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-5 gap-4 p-4">
        {[...Array(5)].map((_, i) => (
          <LuxurySkeleton key={i} className="h-4" />
        ))}
      </div>
      
      {/* Rows */}
      {[...Array(rows)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="grid grid-cols-5 gap-4 p-4 border-t border-border/50"
        >
          {[...Array(5)].map((_, j) => (
            <LuxurySkeleton key={j} className="h-6" />
          ))}
        </motion.div>
      ))}
    </div>
  );
};
