import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  className,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={cn("flex items-center gap-0.5", className)} id="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")}
          id={`star-full-${i}`}
        />
      ))}
      {hasHalfStar && (
        <StarHalf
          className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")}
          id="star-half"
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={cn(sizeClasses[size], "text-muted-foreground/30")}
          id={`star-empty-${i}`}
        />
      ))}
    </div>
  );
}
