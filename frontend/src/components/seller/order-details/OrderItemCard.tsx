import React from "react";
import type { OrderItem } from "@/types/orders";

interface OrderItemCardProps {
  item: OrderItem;
}

export const OrderItemCard: React.FC<OrderItemCardProps> = ({ item }) => {
  const subtotal = item.quantity * item.price;

  return (
    <div className="flex items-center gap-6 p-4 rounded-[32px] bg-white border border-neutral-100 hover:shadow-lg hover:shadow-neutral-200/40 transition-all group">
      <div className="h-24 w-24 rounded-[24px] overflow-hidden border border-neutral-100 bg-neutral-50 shrink-0">
        <img
          src={item.productImageUrl}
          alt={item.productName}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        <h4 className="text-xl font-black text-neutral-900 truncate">
          {item.productName}
        </h4>
        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-neutral-100 px-3 py-1 rounded-full text-xs font-bold text-neutral-600">
            Qty: {item.quantity}
          </div>
          <div className="text-sm font-bold text-neutral-400">
            ₱{item.price}{" "}
            <span className="text-[10px] uppercase tracking-widest ml-1">
              each
            </span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
          Subtotal
        </p>
        <p className="text-2xl font-black text-emerald-600">₱{subtotal}</p>
      </div>
    </div>
  );
};
