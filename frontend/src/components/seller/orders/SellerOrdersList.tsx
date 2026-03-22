import type { Order, OrderStatus } from "@/types/orders";
import { SellerOrderCard } from "./SellerOrderCard";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

interface SellerOrdersListProps {
  orders: Order[];
  onStatusChange: (
    orderId: string,
    newStatus: OrderStatus,
  ) => void;
  refetchOrders: () => void;
}

export const SellerOrdersList = ({
  orders,
  onStatusChange,
  refetchOrders,
}: SellerOrdersListProps) => {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-neutral-50/50 rounded-[40px] border-2 border-dashed border-neutral-200">
        <div className="bg-white p-8 rounded-full shadow-xl shadow-neutral-200/50">
          <ShoppingBag className="h-16 w-16 text-neutral-200" />
        </div>
        <div className="space-y-2 max-w-xs">
          <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
            No orders yet
          </h3>
          <p className="text-neutral-500 font-medium leading-relaxed">
            When buyers purchase your products, orders will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      <AnimatePresence mode="popLayout">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <SellerOrderCard
              order={order}
              onStatusChange={onStatusChange}
              refetchOrders={refetchOrders}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
