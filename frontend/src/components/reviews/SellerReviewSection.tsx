import React from 'react';
import { StarRatingInput } from './StarRatingInput';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface SellerReviewSectionProps {
  sellerName: string;
  sellerAvatar?: string;
  rating: number;
  comment: string;
  onRatingChange: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  id?: string;
}

export const SellerReviewSection: React.FC<SellerReviewSectionProps> = ({
  sellerName,
  sellerAvatar,
  rating,
  comment,
  onRatingChange,
  onCommentChange,
  id = 'seller-review-section',
}) => {
  const MAX_CHARS = 300;

  return (
    <div className="space-y-6 p-6 rounded-[32px] bg-neutral-50/50 border border-neutral-100" id={id}>
      <div className="flex items-center gap-4" id={`${id}-seller-info`}>
        <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200" id={`${id}-avatar-container`}>
          {sellerAvatar ? (
            <img 
              src={sellerAvatar} 
              alt={sellerName} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
              id={`${id}-avatar`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300" id={`${id}-placeholder`}>
              <User className="w-8 h-8" />
            </div>
          )}
        </div>
        <div className="space-y-1" id={`${id}-details`}>
          <h3 className="text-lg font-black tracking-tight text-neutral-900" id={`${id}-name`}>
            Seller: {sellerName}
          </h3>
          <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest" id={`${id}-label`}>
            Rate the seller
          </p>
        </div>
      </div>

      <StarRatingInput 
        rating={rating} 
        onRatingChange={onRatingChange} 
        label="Rate the seller"
        id={`${id}-rating`}
      />

      <div className="space-y-2" id={`${id}-comment-container`}>
        <div className="flex justify-between items-center" id={`${id}-comment-header`}>
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-400" id={`${id}-comment-label`}>
            Share your experience
          </p>
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-widest",
            comment.length > MAX_CHARS ? "text-rose-500" : "text-neutral-400"
          )} id={`${id}-char-count`}>
            {comment.length}/{MAX_CHARS}
          </span>
        </div>
        <Textarea
          placeholder="How was the seller's communication and service?"
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          className="rounded-2xl border-2 border-neutral-100 focus:border-emerald-500 transition-all outline-none min-h-25 resize-none"
          id={`${id}-textarea`}
        />
      </div>
    </div>
  );
};
