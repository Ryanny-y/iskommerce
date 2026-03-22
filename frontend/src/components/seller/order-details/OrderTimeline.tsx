import React from 'react';
import type { OrderStatus } from '@/types/orders';
import { CheckCircle2, Clock, Package, Truck, ShoppingBag, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderTimelineProps {
  currentStatus: OrderStatus;
}

const STEPS: { status: OrderStatus; label: string; icon: any }[] = [
  { status: 'PENDING', label: 'Order Placed', icon: Clock },
  { status: 'ACCEPTED', label: 'Accepted', icon: CheckCircle2 },
  { status: 'PREPARING', label: 'Preparing', icon: Package },
  { status: 'READY', label: 'Ready for Pickup', icon: Truck },
  { status: 'COMPLETED', label: 'Completed', icon: ShoppingBag },
];

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ currentStatus }) => {
  const normalizedStatus = currentStatus === 'ACCEPTED' ? 'CONFIRMED' : (currentStatus === 'READY' ? 'READY_FOR_PICKUP' : currentStatus);
  const currentStepIndex = STEPS.findIndex((s) => s.status === normalizedStatus);
  const isCancelled = currentStatus === 'CANCELLED';

  if (isCancelled) {
    return (
      <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-neutral-200/50 border border-neutral-100 space-y-8">
        <div className="flex items-center gap-3">
          <div className="bg-rose-100 p-2 rounded-xl">
            <XCircle className="h-5 w-5 text-rose-600" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-neutral-900">
            Order Timeline
          </h2>
        </div>
        <div className="flex items-center gap-4 p-6 rounded-2xl bg-rose-50 border border-rose-100">
          <XCircle className="h-8 w-8 text-rose-600" />
          <div className="space-y-1">
            <p className="text-xl font-black text-rose-900 tracking-tight">Order Cancelled</p>
            <p className="text-rose-600 font-medium">This order has been cancelled and will not proceed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-neutral-200/50 border border-neutral-100 space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-100 p-2 rounded-xl">
          <Clock className="h-5 w-5 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-neutral-900">
          Order Timeline
        </h2>
      </div>

      <div className="relative space-y-8">
        <div className="absolute left-4.75 top-4 bottom-4 w-0.5 bg-neutral-100" />
        
        {STEPS.map((step, index) => {
          const isPast = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const Icon = step.icon;
          
          return (
            <div key={step.status} className="relative flex items-center gap-6 group">
              <div className={cn(
                "relative z-10 flex items-center justify-center h-10 w-10 rounded-full border-4 border-white transition-all duration-500",
                isPast ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : 
                isCurrent ? "bg-white text-emerald-600 border-emerald-600 shadow-lg shadow-emerald-200" : 
                "bg-neutral-100 text-neutral-400"
              )}>
                {isPast ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
              
              <div className="space-y-1">
                <p className={cn(
                  "text-lg font-black tracking-tight transition-colors",
                  isPast ? "text-neutral-500" : isCurrent ? "text-neutral-900" : "text-neutral-300"
                )}>
                  {step.label}
                </p>
                {isCurrent && currentStatus !== "COMPLETED" && (
                  <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">In Progress</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
