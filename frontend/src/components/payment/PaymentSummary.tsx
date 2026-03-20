import type { SellerOrderFulfillment } from "@/types/checkout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, ShoppingBag } from "lucide-react";

interface PaymentSummaryProps {
  sellerOrders: SellerOrderFulfillment[];
  totalAmount: number;
}

export const PaymentSummary = ({
  sellerOrders,
  totalAmount,
}: PaymentSummaryProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-100 p-3 rounded-2xl">
          <ShoppingBag className="h-6 w-6 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-black tracking-tight text-neutral-900">
          Order Summary
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sellerOrders.map((order) => {
          const subtotal = order.items.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0,
          );
          return (
            <Card
              key={order.sellerId}
              className="overflow-hidden border-none shadow-xl shadow-neutral-200/50 rounded-[32px] bg-white transition-all hover:shadow-2xl hover:shadow-neutral-200/60"
            >
              <CardHeader className="p-6 pb-4 border-b border-neutral-50">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-xl">
                    <User className="h-5 w-5 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg font-black tracking-tight text-neutral-900">
                    Seller: {order.sellerName}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm font-medium"
                    >
                      <span className="text-neutral-600">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span className="text-neutral-900 font-bold">
                        ₱{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-neutral-100" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    Subtotal
                  </span>
                  <span className="text-lg font-black text-emerald-600">
                    ₱{subtotal}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="p-8 rounded-[40px] bg-emerald-600 text-white shadow-2xl shadow-emerald-200 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center md:text-left">
          <p className="text-emerald-100 font-bold uppercase tracking-widest text-sm">
            Total Amount to Pay
          </p>
          <h3 className="text-4xl font-black tracking-tight">₱{totalAmount}</h3>
        </div>
        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-3xl backdrop-blur-sm">
          <div className="bg-white/20 p-2 rounded-xl">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-lg">
            {sellerOrders.length} Sellers ·{" "}
            {sellerOrders.reduce((acc, order) => acc + order.items.length, 0)}{" "}
            Items
          </span>
        </div>
      </div>
    </div>
  );
};
