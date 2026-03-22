import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Order, OrderStatus } from "@/types/orders";
import { OrderHeader } from "@/components/seller/order-details/OrderHeader";
import { OrderItems } from "@/components/seller/order-details/Orderitems";
import { OrderStatusActions } from "@/components/seller/order-details/OrderStatusActions";
import { OrderTimeline } from "@/components/seller/order-details/OrderTimeline";
import { FulfillmentDetails } from "@/components/seller/order-details/FulfillmentDetails";
import { PaymentDetails } from "@/components/seller/order-details/PaymentDetails";
// import { BuyerInfo } from "@/components/seller/order-details/BuyerInfo";
import { toast } from "sonner";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import useFetchData from "@/hooks/useFetchData";
import type { ApiResponse } from "@/types/common";
import { getErrorMessage } from "@/utils/errorHandlers";
import useMutation from "@/hooks/useMutation";

const SellerOrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { execute } = useMutation();
  const [isUpdating, setIsUpdating] = useState(false);

  const { data, loading, error, refetchData: refetchOrder } = useFetchData<ApiResponse<Order>>(
    `orders/seller/${orderId}`,
  );

  const order = data?.data;

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
      await refetchOrder();
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsUpdating(false);
    }
  };
  if (!order) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 md:px-8 py-10 space-y-10">
        {/* Breadcrumbs & Back Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="rounded-2xl hover:bg-neutral-100 font-bold text-neutral-600 gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </Button>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-neutral-400 uppercase tracking-widest">
              <span>Seller Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Orders</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-neutral-900">Order #{order.id}</span>
            </div>
          </div>
        </div>

        {/* Order Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <OrderHeader order={order} />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Order Info */}
          <div className="lg:col-span-8 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <OrderItems order={order} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <FulfillmentDetails order={order} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <PaymentDetails order={order} />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Actions & Timeline */}
          <div className="lg:col-span-4 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <OrderStatusActions
                order={order}
                onStatusChange={handleStatusChange}
                refetchOrder={refetchOrder}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <OrderTimeline currentStatus={order.status} />
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <BuyerInfo order={order} />
            </motion.div> */}
          </div>
        </div>
      </main>

      <footer className="h-20" />
    </div>
  );
};

export default SellerOrderDetailsPage;
