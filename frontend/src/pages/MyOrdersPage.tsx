import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrderCard } from "@/components/orders/OrderCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Search, ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { ApiResponse } from "@/types/common";
import useFetchData from "@/hooks/useFetchData";
import type { Order, OrderStatus } from "@/types/orders";
import { OrdersStats } from "@/components/orders/OrdersStats";
import { OrdersList } from "@/components/orders/OrdersList";
import { OrderDetailsDialog } from "@/components/dialogs/OrderDetailsDialog";

const STATUS_TABS: { label: string; value: OrderStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Preparing", value: "PREPARING" },
  { label: "Ready", value: "READY" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const MyOrdersPage: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { data, loading, error, refetchData } =
    useFetchData<ApiResponse<Order[]>>("orders/buyer");

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleCancelOrder = (id: string) => {
    // setOrders((prev) =>
    //   prev.map((o) => (o.id === id ? { ...o, status: "CANCELLED" } : o)),
    // );
    // toast.error(`Order ${id} has been cancelled`);
  };

  const handleCompleteOrder = (id: string) => {
    // setOrders((prev) =>
    //   prev.map((o) => (o.id === id ? { ...o, status: "COMPLETED" } : o)),
    // );
    // toast.success(`Order ${id} marked as completed!`);
  };

  if (!data || !data.data) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 md:px-8 py-8 space-y-10">
        {/* Header Section */}
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-xl">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            My Orders
          </h1>
          <p className="text-muted-foreground">
            Track the items you have purchased from sellers on Iskommerce.
          </p>
        </div>

        {/* Stats Section */}
        {/* <OrdersStats stats={stats} /> */}

        {/* Orders List Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <div className="text-sm text-muted-foreground">
              Showing {data?.data.length} orders
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <OrdersList
              orders={data?.data || []}
              onViewDetails={handleViewDetails}
              onCancel={handleCancelOrder}
              onComplete={handleCompleteOrder}
            />
          </motion.div>
        </div>
      </main>

      <footer className="border-t py-8 mt-12 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Iskommerce Buyer Dashboard.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Buyer Protection
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Refund Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Help
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyOrdersPage;
