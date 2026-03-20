import { useState } from "react";
import { SellerOrdersTabs } from "@/components/seller/orders/SellerOrdersTab";
import { SellerOrdersList } from "@/components/seller/orders/SellerOrdersList";
import type { Order } from "@/types/orders";
import { ShoppingBag, Filter, Search } from "lucide-react";
import type { ApiResponse } from "@/types/common";
import useFetchData from "@/hooks/useFetchData";

const MySalesPage = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const {
    data: orders,
    loading: ordersLoading,
    error: ordersError,
    refetchData: refetchOrders,
  } = useFetchData<ApiResponse<Order[]>>(`orders/seller`);

  const handleStatusChange = () =>
    // orderId: string,
    // newStatus: OrderStatus,
    // details?: { pickupLocation?: string; pickupTime?: string },
    {
      // setOrders((prev) =>
      //   prev.map((order) =>
      //     order.id === orderId
      //       ? {
      //           ...order,
      //           status: newStatus,
      //           ...(details || {}),
      //         }
      //       : order,
      //   ),
      // );
      // if (newStatus === "ACCEPTED") {
      //   toast.success(`Order #${orderId} accepted!`, {
      //     description: `Pickup details have been sent to the buyer.`,
      //     className: "rounded-2xl font-bold",
      //   });
      // } else if (newStatus === "CANCELLED") {
      //   toast.error(`Order #${orderId} rejected.`, {
      //     description: `The buyer has been notified.`,
      //     className: "rounded-2xl font-bold",
      //   });
      // }
    };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 container mx-auto px-4 md:px-8 py-10 space-y-10">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-3 rounded-2xl">
                <ShoppingBag className="h-6 w-6 text-emerald-600" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-neutral-900">
                Orders
              </h1>
            </div>
            <p className="text-neutral-500 font-medium text-lg">
              Manage incoming customer orders and track their progress.
            </p>
          </div>

          {/* <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <Input
              placeholder="Search by ID or Buyer..."
              className="pl-12 h-14 rounded-2xl border-2 border-neutral-100 focus:border-emerald-500 transition-all bg-neutral-50/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div> */}
        </section>

        {/* Tabs Section */}
        <section className="space-y-8">
          <SellerOrdersTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="flex items-center gap-2 text-sm font-bold text-neutral-400 uppercase tracking-widest">
            <Filter className="h-4 w-4" />
            <span>
              Showing {orders?.data?.length} {activeTab.toLowerCase()} orders
            </span>
          </div>

          <SellerOrdersList
            orders={orders?.data ?? []}
            onStatusChange={handleStatusChange}
            onViewDetails={handleViewDetails}
          />
        </section>
      </main>
    </div>
  );
};

export default MySalesPage;
