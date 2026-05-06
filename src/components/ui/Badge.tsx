import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "accent";
}

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-foreground/10 text-foreground": variant === "default",
          "border border-border text-muted-foreground": variant === "outline",
          "bg-accent text-white": variant === "accent",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
