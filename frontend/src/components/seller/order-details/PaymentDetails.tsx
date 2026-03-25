import React from 'react';
import type { Order } from '@/types/orders';
import { CreditCard, Wallet, Banknote, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentDetailsProps {
  order: Order;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({ order }) => {
  const isPaid = order.paymentStatus === 'PAID';
  const isPending = order.paymentStatus === 'PENDING';
  const isFailed = order.paymentStatus === 'FAILED';

  const getPaymentIcon = () => {
    switch (order.paymentMethod) {
      // case 'GCASH': return Wallet;
      // case 'CARD': return CreditCard;
      case 'CASH': return Banknote;
      default: return CreditCard;
    }
  };

  const PaymentIcon = getPaymentIcon();

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-neutral-200/50 border border-neutral-100 space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-100 p-2 rounded-xl">
          <CreditCard className="h-5 w-5 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-neutral-900">
          Payment Details
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl shadow-sm">
                <PaymentIcon className="h-5 w-5 text-neutral-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Method</p>
                <p className="text-lg font-black text-neutral-900 tracking-tight">{order.paymentMethod}</p>
              </div>
            </div>
            
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest",
              isPaid ? "bg-emerald-100 text-emerald-600" : 
              isPending ? "bg-orange-100 text-orange-600" : 
              "bg-rose-100 text-rose-600"
            )}>
              {isPaid ? <CheckCircle2 className="h-3 w-3" /> : 
               isPending ? <Clock className="h-3 w-3" /> : 
               <AlertCircle className="h-3 w-3" />}
              {order.paymentStatus}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center px-6 py-4 rounded-2xl bg-emerald-50 border border-emerald-100">
          <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Total Amount</span>
          <span className="text-2xl font-black text-emerald-600">₱{order.total}</span>
        </div>
      </div>
    </div>
  );
};
