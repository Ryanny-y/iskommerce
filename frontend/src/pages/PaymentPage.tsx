import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PaymentSummary } from "@/components/payment/PaymentSummary";
import { PaymentMethodSelector } from "@/components/payment/PaymentMethodSelector";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type {
  PaymentMethod,
  CheckoutFormData,
  PaymentData,
} from "@/types/checkout";
import { ChevronLeft, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useMutation from "@/hooks/useMutation";
import { getErrorMessage } from "@/utils/errorHandlers";

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");
  const { execute } = useMutation();
  const [isProcessing, setIsProcessing] = useState(false);

  const checkoutData = location.state?.checkoutData as CheckoutFormData;
  const totalAmount = location.state?.totalAmount as number;

  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center space-y-6">
        <h2 className="text-2xl font-bold">No checkout data found</h2>
        <Button onClick={() => navigate("/dashboard")}>
          Back to Marketplace
        </Button>
      </div>
    );
  }

  const handlePayment = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const paymentData: PaymentData = {
      sellerOrders: checkoutData.sellerOrders.map((order) => ({
        ...order, // includes items + totalAmount
        meetupTime: order.meetupTime
          ? new Date(order.meetupTime).toISOString()
          : undefined,
      })),
      paymentMethod,
      totalAmount: checkoutData.sellerOrders.reduce(
        (sum, order) => sum + order.total,
        0,
      ),
    };

    try {
      const response: any = await execute("cart/checkout", {
        method: "POST",
        body: JSON.stringify(paymentData),
      });

      toast.success(response.message);
      clearCart();
      navigate("/order-success");
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 md:px-8 py-10 space-y-16">
        <div className="space-y-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-500 transition-colors hover:text-emerald-600 mb-4"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Checkout
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-3 rounded-2xl">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-neutral-900">
              Payment
            </h1>
          </div>
          <p className="text-neutral-500 font-medium text-lg">
            Complete your purchase securely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <PaymentSummary
              sellerOrders={checkoutData.sellerOrders}
              totalAmount={totalAmount}
            />
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="p-8 rounded-[40px] bg-white border-none shadow-2xl shadow-neutral-200/50 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black tracking-tight text-neutral-900">
                    Final Confirmation
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-bold text-neutral-500 uppercase tracking-widest">
                      <span>Payment Method</span>
                      <span className="text-neutral-900">{paymentMethod}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-neutral-500 uppercase tracking-widest">
                      <span>Total Amount</span>
                      <span className="text-xl font-black text-emerald-600">
                        ₱{totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full h-16 rounded-[24px] bg-emerald-600 hover:bg-emerald-700 text-lg font-black tracking-tight gap-3 shadow-xl shadow-emerald-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm Payment
                      <ArrowRight className="h-6 w-6" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Secure Transaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="h-20" />
    </div>
  );
};

export default PaymentPage;
