import { Progress } from "@/components/ui/progress";
import { StarRating } from "./StarRating";

interface RatingDistribution {
  stars: number;
  count: number;
}

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  distribution: RatingDistribution[];
}

export function ReviewSummary({
  averageRating,
  totalReviews,
  distribution,
}: ReviewSummaryProps) {
  // Sort distribution by stars descending (5 to 1)
  const sortedDistribution = [...distribution].sort((a, b) => b.stars - a.stars);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-b" id="review-summary">
      {/* Left side: Overall Rating */}
      <div className="flex flex-col items-center justify-center text-center md:border-r md:pr-8" id="overall-rating">
        <div className="text-5xl font-bold text-foreground mb-2" id="avg-rating-value">
          {averageRating.toFixed(1)}
        </div>
        <StarRating rating={averageRating} size="lg" className="mb-2" />
        <div className="text-sm text-muted-foreground" id="total-reviews-count">
          Based on {totalReviews} reviews
        </div>
      </div>

      {/* Right side: Progress Bars */}
      <div className="flex flex-col gap-3" id="rating-distribution">
        {sortedDistribution.map((item) => {
          const percentage = totalReviews > 0 ? (item.count / totalReviews) * 100 : 0;
          return (
            <div key={item.stars} className="flex items-center gap-4" id={`rating-row-${item.stars}`}>
              <div className="flex items-center gap-1 w-12" id={`rating-label-${item.stars}`}>
                <span className="text-sm font-medium">{item.stars}</span>
                <StarRating rating={1} maxRating={1} size="sm" />
              </div>
              <Progress value={percentage} className="h-2 flex-1" id={`progress-bar-${item.stars}`} />
              <div className="text-sm text-muted-foreground w-10 text-right" id={`rating-count-${item.stars}`}>
                {item.count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
