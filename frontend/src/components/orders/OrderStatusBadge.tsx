import React from 'react';
import type { OrderStatus } from '@/types/orders';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, className }) => {
  const getStatusStyles = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
      case 'ACCEPTED':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'PREPARING':
        return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'READY':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'COMPLETED':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'CANCELLED':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-bold uppercase tracking-widest text-[10px] px-2.5 py-0.5 rounded-full border-2",
        getStatusStyles(status),
        className
      )}
    >
      {status}
    </Badge>
  );
};
