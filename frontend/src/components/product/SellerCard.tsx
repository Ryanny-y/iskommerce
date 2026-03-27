import { type Product } from "@/types/marketplace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ExternalLink, ShieldCheck } from "lucide-react";
import useMutation from "@/hooks/useMutation";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/contexts/AuthContext";
import type { ChatConversation } from "@/types/chat";

interface SellerCardProps {
  product: Product;
}

export const SellerCard = ({ product }: SellerCardProps) => {
  const { execute } = useMutation();
  const navigate = useNavigate();
  const { authResponse } = useAuth();

  const handleChatSeller = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentUserId = authResponse!.userData.id;
    e.stopPropagation();
    e.preventDefault();

    try {
      const response: ChatConversation = await execute("chat/conversations", {
        method: "POST",
        body: JSON.stringify({
          buyerId: currentUserId,
          sellerId: product.sellerId,
        }),
      });

      navigate(`/messages/${response.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="rounded-[40px] border-none bg-white p-8 shadow-xl shadow-neutral-200/50 transition-all hover:shadow-2xl hover:shadow-neutral-200/60">
      <CardHeader className="flex flex-row items-center gap-4 p-0 pb-6">
        <Avatar className="h-20 w-20 border-4 border-emerald-50 shadow-inner">
          <AvatarImage
            src={product.sellerAvatar || undefined}
            alt={product.seller}
          />
          <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold text-2xl">
            {product.seller[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl font-bold tracking-tight text-neutral-900">
              {product.seller}
            </CardTitle>
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-emerald-600 uppercase tracking-widest">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Verified Seller
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="h-12 flex-1 rounded-2xl border-2 border-neutral-100 font-bold hover:bg-neutral-50 transition-all"
            onClick={() =>
              console.log("Viewing seller profile:", product.sellerId)
            }
            asChild
          >
            <Link to={`/seller/${product.sellerId}`}>
              <ExternalLink className="mr-2 h-4 w-4" />
              View Seller Profile
            </Link>
          </Button>
          <Button
            className="h-12 flex-1 rounded-2xl bg-neutral-900 font-bold text-white hover:bg-neutral-800 transition-all"
            onClick={handleChatSeller}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat Seller
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
