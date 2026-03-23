import React, { useState } from "react";
import type { Order } from "@/types/orders";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderItem } from "./OrderItem";
import { OrderTimeline } from "./OrderTimeline";
import { Button } from "@/components/ui/button";
import { MessageSquare, Eye, XCircle, Star, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { OrderDetailsDialog } from "@/components/dialogs/OrderDetailsDialog";
import dayjs from "dayjs";
import { CancelOrderDialog } from "../dialogs/CancelOrderDialog";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/common";
import useMutation from "@/hooks/useMutation";
import useAuth from "@/contexts/AuthContext";
import type { ChatConversation } from "@/types/chat";

interface OrderCardProps {
  order: Order;
  refetchOrder: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  refetchOrder,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const { execute } = useMutation();
  const navigate = useNavigate();
  const { authResponse } = useAuth()

  const handleCancelOrder = async (cancelReason: string) => {
    if (isCancelling) return;
    setIsCancelling(true);
    try {
      const response: ApiResponse<Order> = await execute(
        `orders/${order.id}/cancel`,
        {
          method: "POST",
          body: JSON.stringify({ cancelReason }),
        },
      );

      toast.success(response.message);
      setIsCancelOpen(false);
      refetchOrder();
    } catch (error) {
    } finally {
      setIsCancelling(false);
    }
  };

  const handleChatSeller = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentUserId = authResponse!.userData.id;
    e.stopPropagation();
    e.preventDefault();

    try {
      const response: ChatConversation = await execute("chat/conversations", {
        method: "POST",
        body: JSON.stringify({
          buyerId: currentUserId,
          sellerId: order.sellerId,
        }),
      });

      navigate(`/messages/${response.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card className="overflow-hidden border-none shadow-xl shadow-neutral-200/50 rounded-[40px] bg-white transition-all hover:shadow-2xl hover:shadow-neutral-200/60 ">
        <CardHeader className="p-8 pb-4 border-b border-neutral-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-xl">
                  <Eye className="h-5 w-5 text-emerald-600" />
                </div>
                <CardTitle className="text-base md:text-xl font-black tracking-tight text-neutral-900">
                  Order: {order.id}
                </CardTitle>
              </div>
              <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest flex flex-col">
                <span className="text-neutral-900">
                  Seller: {order.sellerName}
                </span>
                <span className="text-xs">
                  Placed: {dayjs(order.createdAt).format("YYYY-MM-DD, hh:ss A")}
                </span>
              </p>
            </div>
            <OrderStatusBadge
              status={order.status}
              className="text-xs px-4 py-1"
            />
          </div>
        </CardHeader>

        <CardContent className="px-8 py-4 space-y-8">
          {/* Items Preview */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
              Order Items
            </h4>
            <div className="space-y-1">
              {order.items.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Timeline Preview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Order Progress
            </h4>
            <OrderTimeline currentStatus={order.status} />
          </div>

          <div className="flex justify-between items-center border-t border-neutral-50">
            <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">
              Total Amount
            </span>
            <span className="text-3xl font-black text-emerald-600">
              ₱{order.total}
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-8 pt-4 border-t border-neutral-50 bg-neutral-50/30 flex flex-wrap gap-4 items-stretch">
          <Button
            asChild
            variant="outline"
            className="flex-1 min-w-35 rounded-2xl border-2 border-neutral-100 font-bold text-neutral-600 hover:bg-neutral-50 gap-2 py-5"
          >
            <Link to={`/messages?sellerId=${order.sellerId}`}>
              <MessageSquare className="h-4 w-4" />
              Chat Seller
            </Link>
          </Button>

          <Button
            onClick={() => setIsDetailsOpen(true)}
            className="flex-1 min-w-35 rounded-2xl bg-neutral-900 hover:bg-neutral-800 font-bold gap-2 py-5"
          >
            <Eye className="h-4 w-4" />
            View Details
          </Button>

          {order.status === "PENDING" && (
            <Button
              variant="ghost"
              className="flex-1 min-w-35 rounded-2xl font-bold text-rose-600 hover:bg-rose-50 gap-2 py-5"
              onClick={() => setIsCancelOpen(true)}
            >
              <XCircle className="h-4 w-4" />
              Cancel Order
            </Button>
          )}

          {order.status === "COMPLETED" && (
            <Button
              variant="outline"
              className="flex-1 min-w-35 rounded-2xl border-2 border-emerald-100 font-bold text-emerald-600 hover:bg-emerald-50 gap-2"
            >
              <Star className="h-4 w-4" />
              Leave Review
            </Button>
          )}
        </CardFooter>
      </Card>

      <OrderDetailsDialog
        order={order}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      <CancelOrderDialog
        orderId={order.id}
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        onConfirm={(reason) => handleCancelOrder(reason)}
      />
    </>
  );
};
