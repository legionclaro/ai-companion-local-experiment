import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: "sm" | "md" | "lg";
    showValue?: boolean;
}

export default function StarRating({
    rating,
    maxRating = 5,
    size = "md",
    showValue = false
}: StarRatingProps) {
    const sizeClasses = {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
    };

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: maxRating }, (_, i) => {
                const filled = i < Math.floor(rating);
                const partial = i === Math.floor(rating) && rating % 1 !== 0;

                return (
                    <Star
                        key={i}
                        className={`${sizeClasses[size]} ${filled
                                ? "fill-yellow-400 text-yellow-400"
                                : partial
                                    ? "fill-yellow-200 text-yellow-400"
                                    : "text-gray-300"
                            }`}
                    />
                );
            })}
            {showValue && (
                <span className="text-sm font-medium ml-1">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
}
