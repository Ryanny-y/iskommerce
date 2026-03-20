import React from "react";
import type { OrderStatus } from "@/types/orders";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Package, Truck, Check } from "lucide-react";

interface OrderTimelineProps {
  currentStatus: OrderStatus;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({
  currentStatus,
}) => {
  const steps: { status: OrderStatus; label: string; icon: React.ReactNode }[] =
    [
      {
        status: "PENDING",
        label: "Order Placed",
        icon: <Clock className="h-4 w-4" />,
      },
      {
        status: "ACCEPTED",
        label: "Accepted",
        icon: <CheckCircle2 className="h-4 w-4" />,
      },
      {
        status: "PREPARING",
        label: "Preparing",
        icon: <Package className="h-4 w-4" />,
      },
      { status: "READY", 
        label: "Ready", 
        icon: <Truck className="h-4 w-4" /> 
      },
      {
        status: "COMPLETED",
        label: "Completed",
        icon: <Check className="h-4 w-4" />,
      },
    ];

  const statusOrder: OrderStatus[] = [
    "PENDING",
    "ACCEPTED",
    "PREPARING",
    "READY",
    "COMPLETED",
  ];
  const currentIndex = statusOrder.indexOf(
    currentStatus === "CANCELLED"
      ? "PENDING"
      : currentStatus === "ACCEPTED"
        ? "ACCEPTED"
        : currentStatus,
  );

  return (
    <div className="relative flex justify-between items-center w-full py-6">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-100 -translate-y-1/2 z-0" />

      {/* Progress Line */}
      <div
        className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
        style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((step, index) => {
        const isActive = index <= currentIndex;
        const isCurrent = index === currentIndex;
        const isCancelled = currentStatus === "CANCELLED";

        return (
          <div
            key={step.status}
            className="relative flex flex-col items-center gap-2 z-10"
          >
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                isActive
                  ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200"
                  : "bg-white border-neutral-200 text-neutral-400",
                isCurrent && "ring-4 ring-emerald-100",
                isCancelled &&
                  index === 0 &&
                  "bg-red-500 border-red-500 shadow-red-200",
              )}
            >
              {step.icon}
            </div>
            <span
              className={cn(
                "absolute -bottom-6 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest transition-colors duration-300",
                isActive ? "text-emerald-600" : "text-neutral-400",
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
