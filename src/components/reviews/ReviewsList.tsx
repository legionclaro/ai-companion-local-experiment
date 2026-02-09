import { Card, CardContent } from "@/components/ui/card";
import { Review } from "@/data/mockReviews";
import StarRating from "./StarRating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Building2, User } from "lucide-react";

interface ReviewsListProps {
    reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p>No hay reseñas disponibles</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <Card key={review.id}>
                    <CardContent className="p-6">
                        <div className="flex gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarFallback>
                                    {review.reviewerType === "institution" ? (
                                        <Building2 className="w-6 h-6" />
                                    ) : (
                                        <User className="w-6 h-6" />
                                    )}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="font-medium">{review.reviewerName}</p>
                                        {review.projectTitle && (
                                            <p className="text-sm text-muted-foreground">
                                                Proyecto: {review.projectTitle}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <StarRating rating={review.rating} size="sm" />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formatDistanceToNow(new Date(review.createdAt), {
                                                addSuffix: true,
                                                locale: es,
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {review.comment}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
