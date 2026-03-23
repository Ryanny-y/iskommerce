import React from "react";
import type { Order } from "@/types/orders";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { FulfillmentDetails } from "@/components/orders/FulfillmentDetails";
import { PaymentDetails } from "@/components/orders/PaymentDetails";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import dayjs from "dayjs";
import useAuth from "@/contexts/AuthContext";
import type { ChatConversation } from "@/types/chat";
import useMutation from "@/hooks/useMutation";

interface OrderDetailsDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const { authResponse } = useAuth();
  const { execute } = useMutation();
  const navigate = useNavigate();

  const handleChatSeller = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentUserId = authResponse!.userData.id;
    e.stopPropagation();
    e.preventDefault();

    try {
      const response: ChatConversation = await execute("chat/conversations", {
        method: "POST",
        body: JSON.stringify({
          buyerId: currentUserId,
          sellerId: order?.sellerId,
        }),
      });

      navigate(`/messages/${response.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!order) return null;
  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-3xl! overflow-x-hidden overflow-y-auto rounded-[40px] border-none shadow-2xl max-h-[90vh] p-0">
          <DialogHeader className="p-8 pb-4 border-b border-neutral-50 ">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-xl">
                    <ShoppingBag className="h-5 w-5 text-emerald-600" />
                  </div>
                  <DialogTitle className="text-2xl font-black tracking-tight text-neutral-900">
                    Order: {order.id}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-neutral-500 font-medium">
                  Placed on{" "}
                  {dayjs(order.createdAt).format("YYYY-MM-DD, hh:ss A")}
                </DialogDescription>
              </div>
              <OrderStatusBadge
                status={order.status}
                className="text-xs px-4 py-1"
              />
            </div>
          </DialogHeader>

          <ScrollArea>
            <div className="flex flex-col p-8 gap-5">
              <div className="flex gap-3 flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-[32px] bg-neutral-50/50 border border-neutral-100">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xl">
                    {order.sellerName?.charAt(0) || "S"}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      Seller
                    </p>
                    <p className="text-lg font-black text-neutral-900">
                      {order.sellerName || "Unknown Seller"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="rounded-2xl border-2 border-neutral-100 font-bold text-neutral-600 hover:bg-neutral-50 gap-2 self-end"
                  onClick={handleChatSeller}
                >
                  <MessageSquare className="h-4 w-4" />
                  Chat Seller
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 px-2">
                  Order Progress
                </h4>
                <OrderTimeline currentStatus={order.status} />
              </div>

              <div className="space-y-4">
                {/* <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 px-2">
                  Order Items
                </h4>
                <div className="p-6 rounded-[32px] bg-white border border-neutral-100 shadow-sm">
                  {order.items.map((item) => (
                    <OrderItem key={item.id} item={item} />
                  ))}
                </div> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FulfillmentDetails order={order} />
                <PaymentDetails order={order} />
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="p-8 pt-4 border-t border-neutral-50 bg-neutral-50/30">
            <Button
              onClick={onClose}
              className="rounded-2xl bg-neutral-900 hover:bg-neutral-800 font-bold px-8"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
