import React from "react";
import type { Order } from "@/types/orders";
import { User, MessageSquare, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BuyerInfoProps {
  order: Order;
}

export const BuyerInfo: React.FC<BuyerInfoProps> = ({ order }) => {
  return (
    <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-neutral-200/50 border border-neutral-100 space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-100 p-2 rounded-xl">
          <User className="h-5 w-5 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-neutral-900">
          Buyer Info
        </h2>
      </div>

      <div className="flex flex-col items-center text-center p-8 rounded-[32px] bg-neutral-50/50 border border-neutral-100 space-y-6">
        <div className="h-24 w-24 rounded-[32px] bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-4xl shadow-lg shadow-emerald-200">
          {order.buyerName.charAt(0)}
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            Customer
          </p>
          <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
            {order.buyerName}
          </h3>
        </div>

        <div className="w-full grid grid-cols-1 gap-3">
          <Button
            asChild
            variant="outline"
            className="h-14 rounded-2xl border-2 border-neutral-100 font-black text-neutral-600 hover:bg-neutral-50 gap-3"
          >
            <Link to={`/messages?buyerId=${order.buyerId}`}>
              <MessageSquare className="h-5 w-5" />
              Send Message
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
