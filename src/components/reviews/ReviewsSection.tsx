import { getReviewsForTarget, getAverageRating } from "@/data/mockReviews";
import ReviewsList from "./ReviewsList";
import StarRating from "./StarRating";

interface ReviewsSectionProps {
    targetId: string;
}

export default function ReviewsSection({ targetId }: ReviewsSectionProps) {
    const reviews = getReviewsForTarget(targetId);
    const averageRating = getAverageRating(targetId);

    return (
        <div className="space-y-4">
            {reviews.length > 0 && (
                <div className="flex items-center gap-4 pb-4 border-b">
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-1">{averageRating.toFixed(1)}</div>
                        <StarRating rating={averageRating} size="md" />
                        <p className="text-sm text-muted-foreground mt-1">
                            {reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"}
                        </p>
                    </div>
                </div>
            )}
            <ReviewsList reviews={reviews} />
        </div>
    );
}
