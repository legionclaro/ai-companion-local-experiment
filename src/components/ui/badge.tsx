import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Custom variants for BioRD
        verified: "border-transparent bg-accent text-accent-foreground shadow-sm",
        specialty: "border-transparent bg-primary/20 text-primary",
        available: "border-transparent bg-primary/30 text-primary font-medium",
        unavailable: "border-transparent bg-muted text-muted-foreground",
        project: "border-transparent bg-primary/10 text-primary",
        open: "border-transparent bg-primary/30 text-primary font-medium",
        closed: "border-transparent bg-muted text-muted-foreground",
        inProgress: "border-transparent bg-accent/40 text-accent-foreground font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
