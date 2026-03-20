import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center space-y-10">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-emerald-100 p-10 rounded-full shadow-2xl shadow-emerald-200"
      >
        <CheckCircle2 className="h-24 w-24 text-emerald-600" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4 max-w-md"
      >
        <h1 className="text-5xl font-black tracking-tight text-neutral-900">
          Order Placed!
        </h1>
        <p className="text-neutral-500 font-medium text-lg leading-relaxed">
          Your order has been successfully placed. Sellers will be notified and
          will contact you regarding fulfillment.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-6 w-full max-w-sm"
      >
        <Button
          onClick={() => navigate("/my-orders")}
          variant="outline"
          className="flex-1 h-14 rounded-2xl border-2 border-neutral-100 font-bold text-neutral-600 hover:bg-neutral-50 transition-all"
        >
          View My Orders
        </Button>
        <Button
          onClick={() => navigate("/dashboard")}
          className="flex-1 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-bold text-white shadow-xl shadow-emerald-200 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2"
        >
          Back to Shop
          <ArrowRight className="h-5 w-5" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-widest"
      >
        <ShoppingBag className="h-4 w-4" />
        Thank you for using Iskommerce
      </motion.div>
    </div>
  );
};

export default OrderSuccessPage;
