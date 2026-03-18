import { Minus, Plus, Trash2 } from "lucide-react";
import { type CartItem as CartItemType } from "@/types/marketplace";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-0">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border">
        <img
          src={item.product.images[0].url}
          alt={item.product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-foreground">
          <h3 className="line-clamp-1">{item.product.name}</h3>
          <p className="ml-4">₱{item.product.price * item.quantity}</p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">₱{item.product.price} each</p>

        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => onUpdateQuantity(item.id, -1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => onUpdateQuantity(item.id, 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
