import React from 'react';
import type { OrderItem as OrderItemType } from '@/types/orders';

interface OrderItemProps {
  item: OrderItemType;
}

export const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-0 border-neutral-50">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50/50">
        <img
          src={item.productImageUrl || 'https://picsum.photos/seed/placeholder/200/200'}
          alt={item.productName}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-black tracking-tight text-neutral-900 truncate">{item.productName}</h4>
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Qty: {item.quantity}</p>
      </div>
      <div className="text-right">
        <div className="text-sm font-black text-neutral-900">₱{item.price * item.quantity}</div>
        <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">₱{item.price} ea</div>
      </div>
    </div>
  );
};
