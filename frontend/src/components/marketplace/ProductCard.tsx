import { Star, ShoppingCart, MessageCircle } from "lucide-react";
import { type Product } from "@/types/marketplace";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {

  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-card pt-0 gap-3">
      <div className="relative aspect-square overflow-hidden h-64">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-md text-foreground border-none">
          {product.category}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg line-clamp-1">{product.name}</h3>
          <span className="font-bold text-primary text-lg">
            ₱{product.price}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>
            Seller:{" "}
            <span className="font-medium text-foreground">
              {product.seller}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-1 text-yellow-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-bold">{product.rating}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Button
          variant="default"
          className="w-full rounded-lg gap-2 py-4"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="h-4 w-4" />
          Add
        </Button>
        <Button variant="outline" className="w-full rounded-lg gap-2 py-4">
          <MessageCircle className="h-4 w-4" />
          Chat
        </Button>
      </CardFooter>
    </Card>
  );
};
