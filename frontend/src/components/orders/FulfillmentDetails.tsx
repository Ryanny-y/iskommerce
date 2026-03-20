import React from 'react';
import type { Order } from '@/types/orders';
import { MapPin, Clock, Info } from 'lucide-react';

interface FulfillmentDetailsProps {
  order: Order;
}

export const FulfillmentDetails: React.FC<FulfillmentDetailsProps> = ({ order }) => {
  const isPickup = order.fulfillmentType === 'PICKUP';

  return (
    <div className="p-6 rounded-[32px] bg-neutral-50/50 border border-neutral-100 space-y-4">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-100 p-2 rounded-xl">
          <MapPin className="h-5 w-5 text-emerald-600" />
        </div>
        <h4 className="text-lg font-black tracking-tight text-neutral-900">
          {isPickup ? 'Pickup from Seller' : 'Meetup Details'}
        </h4>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="h-4 w-4 text-neutral-400 mt-1 shrink-0" />
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Location</p>
            <p className="text-sm font-black text-neutral-900">
              {isPickup ? order.pickupLocation : order.meetupLocation}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="h-4 w-4 text-neutral-400 mt-1 shrink-0" />
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Time</p>
            <p className="text-sm font-black text-neutral-900">
              {isPickup ? order.pickupTime : order.meetupTime}
            </p>
          </div>
        </div>

        {!isPickup && order.meetupNotes && (
          <div className="flex items-start gap-3">
            <Info className="h-4 w-4 text-neutral-400 mt-1 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Notes</p>
              <p className="text-sm font-medium text-neutral-600 italic">
                "{order.meetupNotes}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
