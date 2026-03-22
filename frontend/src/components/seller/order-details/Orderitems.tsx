import React from 'react';
import type { Order } from '@/types/orders';
import { OrderItemCard } from './OrderItemCard';
import { ShoppingBag } from 'lucide-react';

interface OrderItemsProps {
  order: Order;
}

export const OrderItems: React.FC<OrderItemsProps> = ({ order }) => {
  return (
    <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-neutral-200/50 border border-neutral-100 space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-100 p-2 rounded-xl">
          <ShoppingBag className="h-5 w-5 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-neutral-900">
          Order Items
        </h2>
      </div>
      
      <div className="space-y-4">
        {order.items.map((item) => (
          <OrderItemCard key={item.id} item={item} />
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-8 border-t border-neutral-50">
        <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Total Amount</span>
        <span className="text-4xl font-black text-emerald-600">₱{order.total}</span>
      </div>
    </div>
  );
};
