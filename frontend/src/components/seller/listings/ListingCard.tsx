import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/marketplace";

interface ListingCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onView: (id: string) => void;
}

export const ListingCard = ({
  product,
  onEdit,
  onDelete,
  onView,
}: ListingCardProps) => {
  // const statusColors = {
  //   active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  //   sold: "bg-blue-100 text-blue-700 border-blue-200",
  //   out_of_stock: "bg-red-100 text-red-700 border-red-200",
  // };

  // const statusLabels = {
  //   active: "Active",
  //   sold: "Sold",
  //   out_of_stock: "Out of Stock",
  // };

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-shadow pt-0">
      <div className="relative aspect-square overflow-hidden bg-muted h-60">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-full object-cover transition-transform group-hover:scale-105 h-full"
          referrerPolicy="no-referrer"
        />
        <Badge
          className={cn(
            "absolute top-2 right-2 border font-medium",
            // statusColors[product.status],
          )}
          variant="secondary"
        >
          {product.category}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-xl font-bold text-emerald-600">
            ₱{product.price.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            <span>Stock: {product.stock}</span>
          </div>
          <div className="capitalize">{product.condition}</div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => onEdit(product)}
          >
            <Edit className="h-3.5 w-3.5" />
            <span>Edit</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(product)}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="gap-1"
            onClick={() => onView(product.id)}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>View</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
