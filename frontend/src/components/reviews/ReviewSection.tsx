import { ReviewSummary } from "./ReviewSummary";
import { ReviewList } from "./ReviewList";
import { Star } from "lucide-react";

interface Review {
  id: string;
  user: {
    fullName: string
  }
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  isVerified?: boolean;
}

interface RatingDistribution {
  stars: number;
  count: number;
}

interface ReviewSectionProps {
  averageRating: number;
  totalReviews: number;
  distribution: RatingDistribution[];
  reviews: Review[];
}

export function ReviewSection({
  averageRating,
  totalReviews,
  distribution,
  reviews,
}: ReviewSectionProps) {
  return (
    <section className="mt-12 pt-12 border-t" id="product-reviews-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8" id="reviews-header">
        <div className="flex flex-col gap-1" id="reviews-title-container">
          <h2 className="text-2xl font-bold text-foreground" id="reviews-title">
            Product Reviews
          </h2>
          <div className="flex items-center gap-2" id="reviews-subtitle">
            <div className="flex items-center gap-0.5 text-yellow-400" id="reviews-star-rating">
              <Star className="w-4 h-4 fill-current" id="star-icon" />
              <span className="text-sm font-semibold text-foreground" id="avg-rating-text">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-muted-foreground" id="total-reviews-text">
              out of 5 ({totalReviews} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12" id="reviews-content">
        <ReviewSummary
          averageRating={averageRating}
          totalReviews={totalReviews}
          distribution={distribution}
        />
        <ReviewList reviews={reviews} />
      </div>
    </section>
  );
}

// Example Mock Data for easier integration
export const MOCK_REVIEWS_DATA = {
  averageRating: 4.5,
  totalReviews: 23,
  distribution: [
    { stars: 5, count: 15 },
    { stars: 4, count: 5 },
    { stars: 3, count: 2 },
    { stars: 2, count: 1 },
    { stars: 1, count: 0 },
  ],
  reviews: [
    {
      id: "1",
      userName: "Juan Dela Cruz",
      rating: 5,
      comment: "Solid quality for its price! Highly recommended for students looking for a budget-friendly but durable option.",
      date: "March 20, 2026",
      isVerified: true,
    },
    {
      id: "2",
      userName: "Maria Clara",
      rating: 4,
      comment: "Maganda yung item, mabilis din dumating. Medyo may konting scratches lang pero overall good condition.",
      date: "March 18, 2026",
      isVerified: true,
    },
    {
      id: "3",
      userName: "Jose Rizal",
      rating: 5,
      comment: "Perfect for my needs. The seller was very responsive and the transaction was smooth.",
      date: "March 15, 2026",
      isVerified: false,
    },
    {
      id: "4",
      userName: "Andres Bonifacio",
      rating: 3,
      comment: "Okay lang, expected more but for the price it's acceptable. Good for temporary use.",
      date: "March 10, 2026",
      isVerified: true,
    },
    {
      id: "5",
      userName: "Emilio Aguinaldo",
      rating: 5,
      comment: "Best purchase this semester! Very useful for my projects.",
      date: "March 05, 2026",
      isVerified: true,
    },
    {
      id: "6",
      userName: "Apolinario Mabini",
      rating: 4,
      comment: "Good item, but delivery took a bit long. Still worth the wait.",
      date: "March 01, 2026",
      isVerified: true,
    },
  ],
};
