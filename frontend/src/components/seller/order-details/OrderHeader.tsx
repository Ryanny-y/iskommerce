import React from 'react';
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge';
import type { Order } from '@/types/orders';
import { Calendar, User, Hash } from 'lucide-react';

interface OrderHeaderProps {
  order: Order;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({ order }) => {
  return (
    <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-neutral-200/50 border border-neutral-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-xl">
              <Hash className="h-5 w-5 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-neutral-900">
              Order #{order.id}
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-neutral-500 font-medium">
              <User className="h-4 w-4" />
              <span>Buyer: <span className="text-neutral-900 font-bold">{order.buyerName}</span></span>
            </div>
            <div className="flex items-center gap-2 text-neutral-500 font-medium">
              <Calendar className="h-4 w-4" />
              <span>Placed: <span className="text-neutral-900 font-bold">{order.createdAt}</span></span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Current Status</p>
          <OrderStatusBadge status={order.status} className="text-sm px-6 py-2 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};
