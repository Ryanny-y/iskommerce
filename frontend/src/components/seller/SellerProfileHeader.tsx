import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, Calendar } from "lucide-react";
import type { Seller } from "@/types/seller";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import useAuth from "@/contexts/AuthContext";
import type { ChatConversation } from "@/types/chat";
import useMutation from "@/hooks/useMutation";

interface SellerProfileHeaderProps {
  seller: Seller;
  averageRating: number;
  totalReviews: number;
}

export function SellerProfileHeader({
  seller,
  averageRating,
  totalReviews,
}: SellerProfileHeaderProps) {
  const navigate = useNavigate();
  const { execute } = useMutation();
  const { authResponse } = useAuth();
  const initials = seller.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const isSeller = authResponse?.userData.id === seller.id;

  const handleChatSeller = async () => {
    if (isSeller) return;
    const currentUserId = authResponse!.userData.id;

    try {
      const response: ChatConversation = await execute("chat/conversations", {
        method: "POST",
        body: JSON.stringify({
          buyerId: currentUserId,
          sellerId: seller.id,
        }),
      });
      navigate(`/messages/${response.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white border-b" id="seller-profile-header">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* Avatar Section */}
          <div className="relative" id="seller-avatar-container">
            <Avatar
              className="w-24 h-24 md:w-32 md:h-32 border-4 border-emerald-50 shadow-sm"
              id="seller-avatar"
            >
              <AvatarImage
                src={seller.avatar || undefined}
                alt={seller.fullName}
              />
              <AvatarFallback className="text-2xl font-bold bg-emerald-100 text-emerald-700">
                {initials}
              </AvatarFallback>
            </Avatar>
            <Badge
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-600 border-white shadow-sm"
              id="seller-badge"
            >
              Verified Seller
            </Badge>
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-4" id="seller-info">
            <div className="space-y-1">
              <h1
                className="text-3xl font-black tracking-tight text-neutral-900"
                id="seller-name"
              >
                {seller.fullName}
              </h1>
              <div
                className="flex flex-wrap items-center gap-4 text-sm text-neutral-500"
                id="seller-meta"
              >
                <div className="flex items-center gap-1.5" id="seller-rating">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-neutral-900">
                    {averageRating.toFixed(1)}
                  </span>
                  <span>({totalReviews} reviews)</span>
                </div>
                <div
                  className="flex items-center gap-1.5"
                  id="seller-member-since"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    Member since {dayjs(seller.createdAt).format("MMM YYYY")}
                  </span>
                </div>
              </div>
            </div>

            <p
              className="text-neutral-600 max-w-2xl leading-relaxed"
              id="seller-bio"
            >
              {seller.bio || "No Bio Provided"}
            </p>
          </div>

          {/* Action Section */}
          <div
            className="w-full md:w-auto flex flex-col gap-3"
            id="seller-actions"
          >
            {!isSeller && (
              <Button
                onClick={handleChatSeller}
                className="w-full md:w-auto rounded-2xl bg-emerald-600 font-bold h-12 px-8 gap-2 hover:bg-emerald-700"
                id="chat-seller-button"
              >
                <MessageCircle className="w-5 h-5" />
                Chat Seller
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full md:w-auto rounded-2xl border-neutral-200 font-bold h-12 px-8"
              id="share-profile-button"
            >
              Share Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
