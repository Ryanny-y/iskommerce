import React from "react";
import type { Order } from "@/types/orders";
import { MapPin, Clock, Info } from "lucide-react";
import dayjs from "dayjs";

interface FulfillmentDetailsProps {
  order: Order;
}

export const FulfillmentDetails: React.FC<FulfillmentDetailsProps> = ({
  order,
}) => {
  const isPickup = order.fulfillmentType === "PICKUP";
  const isMeetup = order.fulfillmentType === "MEETUP";

  const getTitle = () => {
    if (isPickup) return "Pickup Details";
    if (isMeetup) return "Meetup Details";
    return "Fulfillment Details";
  };

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-neutral-200/50 border border-neutral-100 space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-100 p-2 rounded-xl">
          <MapPin className="h-5 w-5 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-neutral-900">
          {getTitle()}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {(isPickup || isMeetup) && (
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
            <div className="flex items-center gap-2 text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
              <MapPin className="h-3 w-3" />
              Location
            </div>
            <p className="text-lg font-black text-neutral-900 tracking-tight">
              {isPickup
                ? order.pickupLocation || "Not set"
                : order.meetupLocation || "Not set"}
            </p>
          </div>
        )}

        {(isPickup || isMeetup) && (
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
            <div className="flex items-center gap-2 text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
              <Clock className="h-3 w-3" />
              Time
            </div>
            <p className="text-lg font-black text-neutral-900 tracking-tight">
              {isPickup
                ? dayjs(order.pickupTime).format("MMM DD, YYYY - hh:ss A") ||
                  "Not set"
                : dayjs(order.meetupTime).format("MMM DD, YYYY - hh:ss A") ||
                  "Not set"}{" "}
            </p>
          </div>
        )}

        {order.meetupNotes && (
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
            <div className="flex items-center gap-2 text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
              <Info className="h-3 w-3" />
              Meetup Notes
            </div>
            <p className="text-neutral-900 font-medium">{order.meetupNotes}</p>
          </div>
        )}

        {isMeetup && order.meetupNotes && (
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
            <div className="flex items-center gap-2 text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
              <Info className="h-3 w-3" />
              Meetup Notes
            </div>
            <p className="text-neutral-900 font-medium">{order.meetupNotes}</p>
          </div>
        )}
      </div>
    </div>
  );
};
