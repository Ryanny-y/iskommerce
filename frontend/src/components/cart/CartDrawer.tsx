import { ShoppingBag, ArrowRight } from "lucide-react";
import { type CartItem as CartItemType } from "@/types/marketplace";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "./CartItem";
import { useNavigate } from "react-router-dom";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
}: CartDrawerProps) => {
  if (!items) return;
  const subtotal = items.reduce(
    (acc, item) => acc + (item.product?.price ?? 0) * item.quantity,
    0,
  );
  const navigate = useNavigate();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({items.length})
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          {items.length > 0 ? (
            <ScrollArea className="h-full p-6">
              <div className="space-y-2">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="bg-secondary p-6 rounded-full">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Your cart is empty</h3>
                <p className="text-muted-foreground">
                  Looks like you haven't added anything yet.
                </p>
              </div>
              <Button
                onClick={onClose}
                variant="outline"
                className="rounded-full"
              >
                Start Shopping
              </Button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="mt-auto p-6 border-t bg-secondary/20">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-base font-medium">
                <span>Subtotal</span>
                <span>₱{subtotal}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <Button
                onClick={() => {
                  navigate("/checkout");
                  onClose();
                }}
                className="w-full rounded-full h-12 text-base font-bold gap-2"
              >
                Checkout
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
