import React, { useState } from "react";
import type { Order, OrderStatus } from "@/types/orders";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Package,
  Truck,
  ShoppingBag,
  MessageSquare,
  MapPin,
  Clock,
  Info,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/common";
import useMutation from "@/hooks/useMutation";

interface OrderStatusActionsProps {
  order: Order;
  onStatusChange: (
    orderId: string,
    newStatus: OrderStatus,
    details?: { pickupLocation?: string; pickupTime?: string },
  ) => void;
  refetchOrder: () => void;
}

export const OrderStatusActions: React.FC<OrderStatusActionsProps> = ({
  order,
  onStatusChange,
  refetchOrder,
}) => {
  const [pickupLocation, setPickupLocation] = useState(
    order.pickupLocation || "",
  );
  const [pickupTime, setPickupTime] = useState(order.pickupTime || "");
  const [showValidation, setShowValidation] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const { execute } = useMutation();

  const isPickup = order.fulfillmentType === "PICKUP";
  const canAccept =
    !isPickup || (pickupLocation.trim() !== "" && pickupTime.trim() !== "");
  const isCompletedOrCancelled =
    order.status === "COMPLETED" || order.status === "CANCELLED";

  const handleAccept = async () => {
    if (isAccepting) return;
    setIsAccepting(true);
    if (isPickup && !canAccept) {
      setShowValidation(true);
      return;
    }

    try {
      const formattedPickupTime = pickupTime
        ? new Date(pickupTime).toISOString()
        : null;

      const response: ApiResponse<Order> = await execute(
        `orders/${order.id}/accept`,
        {
          method: "POST",
          body: JSON.stringify({
            pickupLocation,
            pickupTime: formattedPickupTime,
          }),
        },
      );

      toast.success(response.message);
      refetchOrder();
    } catch (error) {
    } finally {
      setIsAccepting(false);
    }
  };

  const handleCancelOrder = async () => {
    if (isCancelling) return;
    setIsCancelling(true);
    try {
      const response: ApiResponse<Order> = await execute(
        `orders/${order.id}/cancel`,
        {
          method: "POST",
          body: JSON.stringify({ cancelReason: "Cancelled by Seller" }),
        },
      );

      toast.success(response.message);
      refetchOrder();
    } catch (error) {
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-neutral-200/50 border border-neutral-100 space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-100 p-2 rounded-xl">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-neutral-900">
          Seller Actions
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {order.status === "PENDING" && (
          <>
            {isPickup && (
              <div className="space-y-4 p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 mb-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
                  <Info className="h-4 w-4" />
                  <span>Set Pickup Details to Confirm</span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="pickupLocation"
                      className="text-xs font-bold uppercase tracking-widest text-neutral-500"
                    >
                      Pickup Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <Input
                        id="pickupLocation"
                        placeholder="e.g. Main Lobby"
                        className={cn(
                          "pl-9 h-12 rounded-xl border-neutral-200 focus:border-emerald-500 bg-white",
                          showValidation &&
                            !pickupLocation.trim() &&
                            "border-red-300 bg-red-50/30",
                        )}
                        value={pickupLocation}
                        onChange={(e) => {
                          setPickupLocation(e.target.value);
                          if (showValidation) setShowValidation(false);
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="pickupTime"
                      className="text-xs font-bold uppercase tracking-widest text-neutral-500"
                    >
                      Pickup Time
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <Input
                        id="pickupTime"
                        type="datetime-local"
                        className={cn(
                          "pl-9 h-12 rounded-xl border-neutral-200 focus:border-emerald-500 bg-white",
                          showValidation &&
                            !pickupTime.trim() &&
                            "border-red-300 bg-red-50/30",
                        )}
                        value={pickupTime}
                        onChange={(e) => {
                          setPickupTime(e.target.value);
                          if (showValidation) setShowValidation(false);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {showValidation && !canAccept && (
                  <div className="flex items-center gap-2 text-xs font-bold text-red-600 mt-2">
                    <AlertCircle className="h-3 w-3" />
                    <span>
                      Please fill in all pickup details before accepting.
                    </span>
                  </div>
                )}
              </div>
            )}
            <Button
              onClick={handleAccept}
              disabled={!canAccept && !showValidation}
              className={cn(
                "h-16 rounded-2xl font-black text-lg gap-3 shadow-lg transition-all",
                canAccept
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed",
              )}
            >
              <CheckCircle className="h-6 w-6" />
              Accept Order
            </Button>
            <Button
              onClick={handleCancelOrder}
              variant="outline"
              className="h-16 rounded-2xl border-2 border-rose-100 text-rose-600 hover:bg-rose-50 font-black text-lg gap-3"
            >
              <XCircle className="h-6 w-6" />
              Cancel Order
            </Button>
          </>
        )}

        {order.status === "ACCEPTED" && (
          <Button
            onClick={() => onStatusChange(order.id, "PREPARING")}
            className="h-16 rounded-2xl bg-orange-600 hover:bg-orange-700 font-black text-lg gap-3 shadow-lg shadow-orange-200"
          >
            <Package className="h-6 w-6" />
            Start Preparing
          </Button>
        )}

        {order.status === "PREPARING" && (
          <Button
            onClick={() => onStatusChange(order.id, "READY")}
            className="h-16 rounded-2xl bg-purple-600 hover:bg-purple-700 font-black text-lg gap-3 shadow-lg shadow-purple-200"
          >
            <Truck className="h-6 w-6" />
            Mark as Ready
          </Button>
        )}

        {order.status === "READY" && (
          <Button
            onClick={() => onStatusChange(order.id, "COMPLETED")}
            className="h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-black text-lg gap-3 shadow-lg shadow-emerald-200"
          >
            <ShoppingBag className="h-6 w-6" />
            Mark as Completed
          </Button>
        )}

        {isCompletedOrCancelled && (
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 text-center space-y-2">
            <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">
              Order Finalized
            </p>
            <p className="text-neutral-900 font-black text-xl">
              No further actions available
            </p>
          </div>
        )}

        <Button
          asChild
          variant="outline"
          className="h-16 rounded-2xl border-2 border-neutral-100 text-neutral-600 hover:bg-neutral-50 font-black text-lg gap-3"
        >
          <Link to={`/messages?buyerId=${order.buyerId}`}>
            <MessageSquare className="h-6 w-6" />
            Chat Buyer
          </Link>
        </Button>
      </div>

      {order.status === "CANCELLED" && order.cancelReason && (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-100 space-y-2">
          <p className="text-rose-600 font-bold uppercase tracking-widest text-xs">
            Cancellation Reason
          </p>
          <p className="text-rose-900 font-medium">{order.cancelReason}</p>
        </div>
      )}
    </div>
  );
};
