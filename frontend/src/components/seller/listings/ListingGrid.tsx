import { ListingCard } from "./ListingCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/marketplace";

interface ListingsGridProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onPostFirst: () => void;
}

export const ListingsGrid = ({
  products,
  isLoading,
  onEdit,
  onDelete,
  onPostFirst,
}: ListingsGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-muted/30 rounded-3xl border-2 border-dashed">
        <div className="bg-background p-6 rounded-full shadow-sm">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2 max-w-xs">
          <h3 className="text-xl font-bold">You have no listings yet</h3>
          <p className="text-muted-foreground">
            Start selling to the campus community by posting your first item.
          </p>
        </div>
        <Button onClick={onPostFirst} className="rounded-full gap-2 px-8">
          <Plus className="h-5 w-5" />
          Post Your First Item
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ListingCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
