import React from 'react';
import type { Order } from '@/types/orders';
import { CreditCard, Banknote, Wallet, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentDetailsProps {
  order: Order;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({ order }) => {
  const getPaymentIcon = () => {
    switch (order.paymentMethod) {
      case 'CASH':
        return <Banknote className="h-5 w-5" />;
      // case 'GCASH':
      //   return <Wallet className="h-5 w-5" />;
      // case 'CARD':
      //   return <CreditCard className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getPaymentStatusStyles = () => {
    switch (order.paymentStatus) {
      case 'PAID':
        return 'bg-emerald-100 text-emerald-600';
      case 'PENDING':
        return 'bg-amber-100 text-amber-600';
      case 'FAILED':
        return 'bg-rose-100 text-rose-600';
      case 'REFUNDED':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  return (
    <div className="p-6 rounded-[32px] bg-neutral-50/50 border border-neutral-100 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-100 p-2 rounded-xl">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
        </div>
        <h4 className="text-lg font-black tracking-tight text-neutral-900">Payment Info</h4>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Method</p>
          <div className="flex items-center gap-2 font-black text-neutral-900">
            {getPaymentIcon()}
            <span>{order.paymentMethod}</span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Status</p>
          <div className={cn(
            "inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest",
            getPaymentStatusStyles()
          )}>
            {order.paymentStatus}
          </div>
        </div>
      </div>

      <div className="h-px bg-neutral-100" />

      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Total Amount</span>
        <span className="text-2xl font-black text-emerald-600">₱{order.total}</span>
      </div>
    </div>
  );
};
