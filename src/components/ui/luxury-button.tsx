import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-500 ease-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase tracking-wider relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-gold",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        luxury: "bg-gradient-gold-shine text-onyx border-0 shadow-gold hover:shadow-gold-intense hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] font-playfair rounded-xl",
        "luxury-outline": "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground font-playfair tracking-wide transition-all duration-300 hover:shadow-gold hover:-translate-y-1 rounded-xl",
        "luxury-ghost": "bg-transparent text-primary hover:bg-primary/10 hover:text-primary rounded-xl",
        "luxury-dark": "bg-gradient-luxury text-white border border-primary/30 shadow-elegant hover:shadow-premium hover:-translate-y-1 font-playfair rounded-xl",
        "luxury-pearl": "bg-gradient-pearl text-foreground border border-border shadow-soft hover:shadow-elegant hover:-translate-y-1 font-playfair rounded-xl",
        diamond: "bg-gradient-diamond text-foreground border border-border shadow-diamond font-playfair font-medium tracking-wide hover:shadow-glow rounded-xl",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
        xl: "h-16 px-10 py-5 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const LuxuryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      </Comp>
    );
  }
);
LuxuryButton.displayName = "LuxuryButton";

export { LuxuryButton, buttonVariants };
