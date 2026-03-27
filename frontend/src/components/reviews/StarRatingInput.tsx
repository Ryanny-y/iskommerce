import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingInputProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxRating?: number;
  label?: string;
  id?: string;
}

export const StarRatingInput: React.FC<StarRatingInputProps> = ({
  rating,
  onRatingChange,
  maxRating = 5,
  label,
  id = 'star-rating-input',
}) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  return (
    <div className="space-y-3" id={`${id}-container`}>
      {label && (
        <p className="text-sm font-bold uppercase tracking-widest text-neutral-400" id={`${id}-label`}>
          {label}
        </p>
      )}
      <div className="flex items-center gap-2" id={id}>
        {[...Array(maxRating)].map((_, i) => {
          const starValue = i + 1;
          const isActive = starValue <= (hoveredRating ?? rating);

          return (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHoveredRating(starValue)}
              onMouseLeave={() => setHoveredRating(null)}
              onClick={() => onRatingChange(starValue)}
              className="focus:outline-none transition-transform active:scale-90"
              id={`${id}-star-${starValue}`}
            >
              <Star
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 transition-colors",
                  isActive 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-neutral-200 fill-neutral-100"
                )}
              />
            </button>
          );
        })}
        {rating > 0 && (
          <span className="ml-2 text-lg font-black text-neutral-900" id={`${id}-value`}>
            {rating}/5
          </span>
        )}
      </div>
    </div>
  );
};
