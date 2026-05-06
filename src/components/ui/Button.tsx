import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-foreground text-background hover:opacity-80 active:scale-[0.98]":
              variant === "primary",
            "border border-border bg-transparent hover:bg-foreground/5":
              variant === "secondary",
            "bg-transparent hover:bg-foreground/5": variant === "ghost",
            "bg-red-500 text-white hover:bg-red-600": variant === "destructive",
            "h-8 px-3 text-xs rounded": size === "sm",
            "h-10 px-5 text-sm rounded-md": size === "md",
            "h-12 px-8 text-base rounded-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
