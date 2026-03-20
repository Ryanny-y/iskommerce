import React from 'react';
import type { Order } from '@/types/orders';
import { OrderCard } from './OrderCard';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrdersListProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
}

export const OrdersList: React.FC<OrdersListProps> = ({
  orders,
  onViewDetails,
  onCancel,
  onComplete
}) => {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-muted/20 rounded-3xl border-2 border-dashed">
        <div className="bg-background p-6 rounded-full shadow-sm">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2 max-w-xs">
          <h3 className="text-xl font-bold">You have not purchased any items yet</h3>
          <p className="text-muted-foreground">Explore the campus marketplace and find something you love!</p>
        </div>
        <Button 
          onClick={() => window.location.href = '/dashboard'} 
          className="rounded-full gap-2 px-8 bg-emerald-600 hover:bg-emerald-700"
        >
          Browse Marketplace
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
};
