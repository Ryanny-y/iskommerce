import React from "react";
import type { OrderStatus } from "@/types/orders";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";

interface OrderTimelineProps {
  currentStatus: OrderStatus;
}

const STATUS_ORDER: OrderStatus[] = [
  "PENDING",
  "ACCEPTED",
  "PREPARING",
  "READY",
  "COMPLETED",
];

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Order Placed",
  ACCEPTED: "Accepted",
  PREPARING: "Preparing",
  READY: "Ready",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const OrderTimeline: React.FC<OrderTimelineProps> = ({
  currentStatus,
}) => {
  if (currentStatus === "CANCELLED") {
    return (
      <div className="flex items-center gap-3 p-4 rounded-3xl bg-rose-50 border border-rose-100 text-rose-600">
        <Circle className="h-5 w-5 shrink-0" />
        <span className="text-sm font-black uppercase tracking-widest">
          Order Cancelled
        </span>
      </div>
    );
  }

  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className="relative flex flex-wrap justify-center items-start w-full px-2 py-8 gap-y-6">
      {/* Progress Line */}
      <div className="absolute top-11.5 left-[10%] right-[10%] h-1 bg-neutral-100 rounded-full" />
      <div
        className="absolute top-11.5 left-[10%] h-1 bg-emerald-500 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${(currentIndex / (STATUS_ORDER.length - 1)) * 80}%` }}
      />

      {STATUS_ORDER.map((status, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div
            key={status}
            className="relative flex flex-col items-center gap-3 z-10 w-1/2 sm:w-1/3 md:w-1/5"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300",
                isCompleted
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100"
                  : "bg-white border-2 border-neutral-100 text-neutral-300",
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
            </div>
            <span
              className={cn(
                "text-[10px] font-black uppercase tracking-widest text-center leading-tight",
                isCurrent
                  ? "text-emerald-600"
                  : isCompleted
                    ? "text-neutral-900"
                    : "text-neutral-400",
              )}
            >
              {STATUS_LABELS[status]}
            </span>
          </div>
        );
      })}
    </div>
  );
};
