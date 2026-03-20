import React from "react";
import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/types/orders";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
    PENDING: { label: "Pending", className: "bg-gray-100 text-gray-700 hover:bg-gray-100" },
    ACCEPTED: { label: "Accepted", className: "bg-blue-100 text-blue-700 hover:bg-blue-100" },
    PREPARING: { label: "Preparing", className: "bg-orange-100 text-orange-700 hover:bg-orange-100" },
    READY: { label: "Ready", className: "bg-purple-100 text-purple-700 hover:bg-purple-100" },
    COMPLETED: { label: "Completed", className: "bg-green-100 text-green-700 hover:bg-green-100" },
    CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-700 hover:bg-red-100" },
  };

  const config = statusConfig[status];

  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
};
