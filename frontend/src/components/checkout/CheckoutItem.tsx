import { type CartItem } from "@/types/marketplace";

interface CheckoutItemProps {
  item: CartItem;
}

export const CheckoutItem = ({ item }: CheckoutItemProps) => {
  return (
    <div className="flex items-center gap-4 py-3 border-b last:border-0">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-secondary/20">
        <img
          src={
            item.product.images?.[0]?.url ||
            "https://picsum.photos/seed/placeholder/200/200"
          }
          alt={item.product.name}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
      </div>
      <div className="text-sm font-semibold">
        ₱{item.product.price * item.quantity}
      </div>
    </div>
  );
};
