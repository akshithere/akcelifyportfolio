import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pixelButtonVariants = cva(
  "relative inline-flex items-center justify-center text-sm font-medium transition-all duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 pixel-button",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        primary: "bg-arcade-green text-dark-screen hover:bg-arcade-green/90",
        secondary: "bg-retro-magenta text-light-gray hover:bg-retro-magenta/90",
        accent: "bg-crt-cyan text-dark-screen hover:bg-crt-cyan/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 bg-dark-screen hover:bg-muted/10",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-3 py-1.5 text-sm",
        lg: "px-8 py-4 text-lg",
      },
      borderColor: {
        default: "border-primary",
        primary: "border-arcade-green",
        secondary: "border-retro-magenta",
        accent: "border-crt-cyan",
        destructive: "border-destructive",
        "arcade-green": "border-arcade-green",
        "retro-magenta": "border-retro-magenta",
        "crt-cyan": "border-crt-cyan",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      borderColor: "default",
    },
  }
);

export interface PixelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pixelButtonVariants> {
  asChild?: boolean;
}

const PixelButton = React.forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant, size, borderColor, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(pixelButtonVariants({ variant, size, borderColor, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

PixelButton.displayName = "PixelButton";

export { PixelButton, pixelButtonVariants };
