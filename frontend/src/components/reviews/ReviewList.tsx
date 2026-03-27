import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "./ReviewCard";
import { MessageSquareOff } from "lucide-react";

interface Review {
  id: string;
  user: {
    id: string,
    avatar?: string,
    isVerified?: boolean,
    fullName: string,
  }
  rating: number;
  comment?: string;
  date: string;
}

interface ReviewListProps {
  reviews: Review[];
  initialCount?: number;
}

export function ReviewList({ reviews, initialCount = 5 }: ReviewListProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + initialCount);
  };

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center" id="empty-reviews-state">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4" id="empty-icon-container">
          <MessageSquareOff className="w-8 h-8 text-muted-foreground" id="empty-icon" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2" id="empty-title">
          No reviews yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs" id="empty-description">
          Be the first to review this product and help others make a better decision!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col" id="review-list-container">
      <div className="divide-y divide-border" id="review-list">
        {visibleReviews.map((review) => (
          <ReviewCard 
            key={review.id} 
            userName={review.user.fullName}
            userAvatar={review.user.avatar}
            rating={review.rating}
            comment={review.comment}
            date={review.date}
            isVerified={review.user.isVerified}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8" id="load-more-container">
          <Button variant="outline" onClick={handleLoadMore} className="w-full sm:w-auto" id="load-more-button">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
}
