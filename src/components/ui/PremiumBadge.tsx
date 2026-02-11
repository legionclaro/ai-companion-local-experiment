import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumBadgeProps {
    className?: string;
    size?: "sm" | "md" | "lg";
}

export default function PremiumBadge({ className, size = "md" }: PremiumBadgeProps) {
    const sizeClasses = {
        sm: "px-1.5 py-0.5 text-[10px] gap-0.5",
        md: "px-2.5 py-1 text-xs gap-1",
        lg: "px-3 py-1.5 text-sm gap-1.5",
    };

    const iconSizes = {
        sm: "w-3 h-3",
        md: "w-3.5 h-3.5",
        lg: "w-4 h-4",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-sm border border-amber-300/20",
                sizeClasses[size],
                className
            )}
        >
            <Crown className={cn("fill-white/20", iconSizes[size])} />
            <span>Premium</span>
        </div>
    );
}
