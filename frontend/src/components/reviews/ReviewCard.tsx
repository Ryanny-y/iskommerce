import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { StarRating } from "./StarRating";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  userName: string;
  userAvatar?: string;
  rating: number;
  comment?: string;
  date: string;
  isVerified?: boolean;
  className?: string;
  key?: string | number;
}

export function ReviewCard({
  userName,
  userAvatar,
  rating,
  comment,
  date,
  isVerified = false,
  className,
}: ReviewCardProps) {
  return (
    <div
      className={cn("py-6 border-b last:border-0", className)}
      id={`review-card-${(userName ?? "anonymous").replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className="flex items-start gap-4" id="review-card-header">
        <Avatar className="w-10 h-10" id="user-avatar">
          <AvatarImage src={userAvatar} alt={userName} id="avatar-image" />
          <AvatarFallback id="avatar-fallback">{userName[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0" id="review-content">
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2"
            id="user-info"
          >
            <div className="flex items-center gap-2" id="user-name-verified">
              <span
                className="font-semibold text-foreground truncate"
                id="user-name"
              >
                {userName}
              </span>
              {isVerified && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 text-[10px] px-1.5 py-0 h-5 bg-emerald-50 text-emerald-700 border-emerald-100"
                  id="verified-badge"
                >
                  <CheckCircle2 className="w-3 h-3" id="verified-icon" />
                  Verified
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground" id="review-date">
              {date}
            </span>
          </div>

          <StarRating rating={rating} size="sm" className="mb-3" />

          <p
            className="text-sm text-muted-foreground leading-relaxed italic"
            id="review-comment"
          >
            {comment ? "{comment}" : 'No Comment'}
          </p>
        </div>
      </div>
    </div>
  );
}
