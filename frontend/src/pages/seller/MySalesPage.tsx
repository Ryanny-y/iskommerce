import { useState } from "react";
import { SellerOrdersTabs } from "@/components/seller/orders/SellerOrdersTab";
import { SellerOrdersList } from "@/components/seller/orders/SellerOrdersList";
import type { Order, OrderStatus } from "@/types/orders";
import { ShoppingBag, Filter, Search } from "lucide-react";
import type { ApiResponse } from "@/types/common";
import useFetchData from "@/hooks/useFetchData";
import useMutation from "@/hooks/useMutation";
import { getErrorMessage } from "@/utils/errorHandlers";
import { toast } from "sonner";

const MySalesPage = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [isUpdating, setIsUpdating] = useState(false);
  const { execute } = useMutation();

  // TODO: Handle Loading and Error
  const {
    data: orders,
    loading: ordersLoading,
    error: ordersError,
    refetchData: refetchOrders,
  } = useFetchData<ApiResponse<Order[]>>(`orders/seller`);

  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus,
  ) => {
    try {
      if (isUpdating) return;
      setIsUpdating(true);

      const response: ApiResponse<Order> = await execute(
        `orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      toast.success(response.message);
      await refetchOrders();
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsUpdating(false);
    }
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
            refetchOrders={refetchOrders}
          />
        </section>
      </main>
    </div>
  );
};

export default MySalesPage;
