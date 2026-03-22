import React, { useState } from "react";
import type { Order, OrderStatus } from "@/types/orders";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { SellerOrderItem } from "./SellerOrderItem";
import { OrderTimeline } from "./OrderTimeline";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Clock,
  Info,
  User,
  CreditCard,
  Wallet,
  Banknote,
  Eye,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import useMutation from "@/hooks/useMutation";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/common";
import { Link } from "react-router-dom";

interface SellerOrderCardProps {
  order: Order;
  onStatusChange: (
    orderId: string,
    newStatus: OrderStatus,
    details?: { pickupLocation?: string; pickupTime?: string },
  ) => void;
  refetchOrders: () => void;
}

export const SellerOrderCard: React.FC<SellerOrderCardProps> = ({
  order,
  onStatusChange,
  refetchOrders,
}) => {
  const [pickupLocation, setPickupLocation] = useState(
    order.pickupLocation || "",
  );
  const [pickupTime, setPickupTime] = useState(order.pickupTime || "");
  const [showValidation, setShowValidation] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const { execute } = useMutation();
  const [isCompleting, setIsCompleting] = useState(false);

  const isPickup = order.fulfillmentType === "PICKUP";
  //   const isPending = order.status === "PENDING";
  const canAccept =
    !isPickup || (pickupLocation.trim() !== "" && pickupTime.trim() !== "");

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
      refetchOrders();
    } catch (error) {
    } finally {
      setIsAccepting(false);
    }
  };

  const handleReject = () => {
    onStatusChange(order.id, "CANCELLED");
  };
  const getPaymentIcon = () => {
    switch (order.paymentMethod) {
      case "GCASH":
        return <Wallet className="h-4 w-4" />;
      case "CARD":
        return <CreditCard className="h-4 w-4" />;
      case "CASH":
        return <Banknote className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const handleCompleteOrder = async (orderId: string) => {
    if (isCompleting) return;
    setIsCompleting(true);
    if (isPickup && !canAccept) {
      setShowValidation(true);
      return;
    }

    try {
      const response: ApiResponse<Order> = await execute(
        `orders/${orderId}/complete`,
        {
          method: "POST",
        },
      );

      toast.success(response.message);
      refetchOrders();
    } catch (error) {
    } finally {
      setIsCompleting(false);
    }
  };

  const getPaymentStatusBadge = () => {
    switch (order.paymentStatus) {
      case "PAID":
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50">
            Paid
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-50">
            Payment Pending
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50">
            Payment Failed
          </Badge>
        );
      case "REFUNDED":
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
            Refunded
          </Badge>
        );
      default:
        return null;
    }
  };

  const renderActions = () => {
    switch (order.status) {
      case "PENDING":
        return (
          <div className="space-y-4 w-full">
            {isPickup && (
              <div className="space-y-4 p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
                  <Info className="h-4 w-4" />
                  <span>Set Pickup Details to Confirm</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor={`location-${order.id}`}
                      className="text-xs font-bold uppercase tracking-widest text-neutral-500"
                    >
                      Pickup Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <Input
                        id={`location-${order.id}`}
                        placeholder="e.g. Main Lobby"
                        className={cn(
                          "pl-9 h-10 rounded-xl border-neutral-200 focus:border-emerald-500 bg-white",
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
                      htmlFor={`time-${order.id}`}
                      className="text-xs font-bold uppercase tracking-widest text-neutral-500"
                    >
                      Pickup Time
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <Input
                        id={`time-${order.id}`}
                        type="datetime-local"
                        className={cn(
                          "pl-9 h-10 rounded-xl border-neutral-200 focus:border-emerald-500 bg-white",
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
            <div className="flex gap-2 w-full">
              <Button
                className={cn(
                  "flex-1 font-bold rounded-xl h-12 transition-all",
                  canAccept
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed",
                )}
                onClick={handleAccept}
                disabled={!canAccept && !showValidation}
              >
                Accept Order
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-xl h-12"
                onClick={handleReject}
              >
                Reject Order
              </Button>
            </div>
          </div>
        );
      case "ACCEPTED":
        return (
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl h-12 shadow-lg shadow-blue-200"
            onClick={() => onStatusChange(order.id, "PREPARING")}
          >
            Start Preparing
          </Button>
        );
      case "PREPARING":
        return (
          <Button
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl h-12"
            onClick={() => onStatusChange(order.id, "READY")}
          >
            Mark as Ready
          </Button>
        );
      case "READY":
        return (
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl h-12"
            onClick={() => handleCompleteOrder(order.id)}
          >
            Mark as Completed
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-xl shadow-neutral-200/50 rounded-[32px] bg-white transition-all hover:shadow-2xl hover:shadow-neutral-200/60">
      <CardHeader className="p-6 pb-4 border-b border-neutral-50">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-black tracking-tight text-neutral-900">
                #{order.id}
              </CardTitle>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500 font-medium">
              <User className="h-4 w-4" />
              <span>Buyer: {order.buyerName}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Placed on
            </p>
            <p className="text-sm font-bold text-neutral-900">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Timeline Section */}
        <div className="px-4">
          <OrderTimeline currentStatus={order.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Payment & Pickup Info */}
          <div className="space-y-4">
            <div className="space-y-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-600">
                  {getPaymentIcon()}
                  <span>{order.paymentMethod}</span>
                </div>
                {getPaymentStatusBadge()}
              </div>
              <div className="h-px bg-neutral-200" />
              {isPickup ? (
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="font-bold text-neutral-900">
                        Pickup: {order.pickupLocation}
                      </p>
                      {order.pickupTime && (
                        <p className="text-neutral-500">
                          Time: {order.pickupTime}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="font-bold text-neutral-900">
                        Meetup: {order.meetupLocation}
                      </p>
                      {order.meetupTime && (
                        <p className="text-neutral-500">
                          Time: {order.meetupTime}
                        </p>
                      )}
                      {order.meetupNotes && (
                        <p className="text-neutral-500 text-sm">
                          Note: {order.meetupNotes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Items Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Items ({order.items.length})
              </h4>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-emerald-600 font-bold hover:bg-emerald-50"
                asChild
              >
                <Link to={`/my-sales/${order.id}`}>
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Link>
              </Button>
            </div>
            <div className="max-h-40 overflow-y-auto pr-2 space-y-1">
              {order.items.map((item) => (
                <SellerOrderItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col gap-4">
        <div className="flex justify-between items-center w-full p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
          <span className="text-sm font-bold text-emerald-800 uppercase tracking-widest">
            Total Amount
          </span>
          <span className="text-2xl font-black text-emerald-600">
            ₱{order.total.toLocaleString()}
          </span>
        </div>
        {renderActions()}
      </CardFooter>
    </Card>
  );
};
