import React from "react";
import type { OrderItem } from "@/types/orders";

interface SellerOrderItemProps {
  item: OrderItem;
}

export const SellerOrderItem: React.FC<SellerOrderItemProps> = ({ item }) => {
  return (
    <div className="flex items-center gap-4 py-3 border-b last:border-0 border-neutral-100">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
        <img
          src={item.productImageUrl || "https://picsum.photos/seed/placeholder/200/200"}
          alt={item.productName}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex flex-1 flex-col min-w-0">
        <h4 className="font-bold text-neutral-900 truncate">{item.productName}</h4>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <span>Qty: {item.quantity}</span>
          <span>•</span>
          <span>₱{item.price.toLocaleString()}</span>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-neutral-900">₱{(item.price * item.quantity).toLocaleString()}</p>
      </div>
    </div>
  );
};
