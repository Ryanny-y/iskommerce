import { useState } from "react";
import { type Product } from "@/types/marketplace";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ShoppingCart,
  MessageSquare,
  Package,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useCart } from "@/contexts/CartContext";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [isAddingToCart] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const { addToCart } = useCart();

  const handleChatSeller = () => {
    setIsChatting(true);
    // Simulate API call
    setTimeout(() => {
      setIsChatting(false);
      console.log("Opening chat with:", product.seller);
    }, 1000);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Badge
            variant="secondary"
            className="bg-emerald-50 text-emerald-700 border-emerald-100"
          >
            {product.category}
          </Badge>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-neutral-900">
              {product.rating}
            </span>
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          {product.name}
        </h1>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-emerald-600">
            ₱{product.price.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-neutral-50 p-4 border border-neutral-100">
        <Package
          className={cn(
            "h-5 w-5",
            isOutOfStock ? "text-red-500" : "text-emerald-600",
          )}
        />
        <span
          className={cn(
            "font-bold",
            isOutOfStock ? "text-red-500" : "text-neutral-900",
          )}
        >
          {isOutOfStock ? "Out of Stock" : `Stock: ${product.stock} available`}
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          onClick={() => addToCart(product)}
          disabled={isOutOfStock || isAddingToCart}
          className="h-14 flex-1 rounded-2xl bg-emerald-600 text-lg font-bold hover:bg-emerald-700 disabled:opacity-50 disabled:shadow-none"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={handleChatSeller}
          disabled={isChatting}
          className="h-14 flex-1 rounded-2xl border-2 border-neutral-200 text-lg font-bold hover:bg-neutral-50"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          {isChatting ? "Connecting..." : "Chat Seller"}
        </Button>
      </div>

      <div className="flex items-center gap-2 text-sm text-neutral-500 pt-2">
        <Clock className="h-4 w-4" />
        <span>Posted on: {dayjs(product.createdAt).format("M/DD/YYYY")}</span>
      </div>
    </div>
  );
};
