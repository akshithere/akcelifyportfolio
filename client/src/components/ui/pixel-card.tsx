import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pixelCardVariants = cva(
  "bg-dark-screen rounded-lg overflow-hidden border-2 blog-card transition-all duration-200 hover:scale-102 hover:shadow",
  {
    variants: {
      borderColor: {
        default: "border-primary hover:shadow-primary/30",
        "arcade-green": "border-arcade-green hover:shadow-arcade-green/30",
        "retro-magenta": "border-retro-magenta hover:shadow-retro-magenta/30",
        "crt-cyan": "border-crt-cyan hover:shadow-crt-cyan/30",
        "coin-yellow": "border-coin-yellow hover:shadow-coin-yellow/30",
      },
      shadowSize: {
        sm: "hover:shadow-sm",
        md: "hover:shadow-md",
        lg: "hover:shadow-lg",
      },
    },
    defaultVariants: {
      borderColor: "default",
      shadowSize: "md",
    },
  }
);

export interface PixelCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pixelCardVariants> {}

const PixelCard = React.forwardRef<HTMLDivElement, PixelCardProps>(
  ({ className, borderColor, shadowSize, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(pixelCardVariants({ borderColor, shadowSize, className }))}
      {...props}
    />
  )
);

PixelCard.displayName = "PixelCard";

export { PixelCard, pixelCardVariants };
