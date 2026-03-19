import React from 'react';
import { type SellerOrderFulfillment } from '@/types/checkout';
import { CheckoutItem } from './CheckoutItem';
import { FulfillmentSelector } from './FulfillmentSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

interface CheckoutSellerGroupProps {
  order: SellerOrderFulfillment;
  index: number;
}

export const CheckoutSellerGroup: React.FC<CheckoutSellerGroupProps> = ({ order, index }) => {
  const subtotal = order.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  return (
    <Card className="overflow-hidden border-none shadow-xl shadow-neutral-200/50 rounded-[32px] bg-white transition-all hover:shadow-2xl hover:shadow-neutral-200/60 gap-0">
      <CardHeader className="p-6 pb-4 border-b border-neutral-50 ">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-xl">
            <User className="h-5 w-5 text-emerald-600" />
          </div>
          <CardTitle className="text-lg font-black tracking-tight text-neutral-900">
            Seller: {order.sellerName}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-1">
          <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Items</h4>
          <div className="space-y-1">
            {order.items.map((item) => (
              <CheckoutItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-neutral-50">
          <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Subtotal</span>
          <span className="text-xl font-black text-emerald-600">₱{subtotal}</span>
        </div>

        <FulfillmentSelector index={index} />
      </CardContent>
    </Card>
  );
};
