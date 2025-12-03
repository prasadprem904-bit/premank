import { cn } from "@/lib/utils";

interface LuxuryBadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "platinum" | "diamond" | "emerald";
  className?: string;
}

export const LuxuryBadge = ({ children, variant = "gold", className }: LuxuryBadgeProps) => {
  const variants = {
    gold: "bg-gradient-gold-shine text-onyx shadow-gold",
    platinum: "bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 text-slate-800 shadow-diamond",
    diamond: "bg-gradient-diamond text-foreground border border-border shadow-diamond",
    emerald: "bg-emerald text-white shadow-soft",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
