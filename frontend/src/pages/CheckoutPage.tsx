import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCart } from "@/contexts/CartContext";
import { Topbar } from "@/components/marketplace/Topbar";
import { CheckoutSellerGroup } from "@/components/checkout/CheckoutSellerGroup";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, ChevronLeft } from "lucide-react";
import type { SellerOrderFulfillment } from "@/types/checkout";

const checkoutSchema = z.object({
  sellerOrders: z.array(
    z
      .object({
        sellerId: z.string(),
        sellerName: z.string(),
        items: z.array(z.any()),
        fulfillmentType: z.enum(["PICKUP", "MEETUP"]),
        meetupLocation: z.string().optional(),
        meetupTime: z.string().optional(),
        meetupNotes: z.string().optional(),
      })
      .refine(
        (data) => {
          if (data.fulfillmentType === "MEETUP") {
            return !!data.meetupLocation && !!data.meetupTime;
          }
          return true;
        },
        {
          message: "Location and time are required for meetup",
          path: ["meetupLocation"],
        },
      ),
  ),
});

const CheckoutPage: React.FC = () => {
  const { cartItems, totalItems, subtotal } = useCart();
  const navigate = useNavigate();
  console.log(cartItems);
  

  const groupedItems = useMemo(() => {
    const groups: Record<string, SellerOrderFulfillment> = {};

    cartItems.forEach((item) => {
      const sellerId = item.product.sellerId;
      const sellerName = item.product.seller;

      if (!groups[sellerId]) {
        groups[sellerId] = {
          sellerId,
          sellerName,
          items: [],
          fulfillmentType: "PICKUP",
        };
      }

      groups[sellerId].items.push(item);
    });

    return Object.values(groups);
  }, [cartItems]);
  const methods = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      sellerOrders: groupedItems,
    },
  });

  const onSubmit = (data: z.infer<typeof checkoutSchema>) => {
    navigate("/payment", {
      state: { checkoutData: data, totalAmount: totalItems },
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Topbar onSearch={() => {}} />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
          <div className="bg-secondary p-8 rounded-full shadow-xl shadow-neutral-200/50">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-neutral-900">
              Your cart is empty
            </h2>
            <p className="text-neutral-500 font-medium max-w-xs mx-auto">
              Add some items to your cart before checking out.
            </p>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            className="rounded-2xl bg-emerald-600 font-bold h-12 px-8"
          >
            Back to Marketplace
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar onSearch={() => {}} />

      <main className="flex-1 container mx-auto px-4 md:px-8 py-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-500 transition-colors hover:text-emerald-600 mb-4"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Marketplace
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-3 rounded-2xl">
                <ShoppingBag className="h-6 w-6 text-emerald-600" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-neutral-900">
                Checkout
              </h1>
            </div>
            <p className="text-neutral-500 font-medium text-lg">
              Review your items and select fulfillment options per seller.
            </p>
          </div>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10"
          >
            <div className="lg:col-span-2 space-y-8">
              {groupedItems.map((group, index) => (
                <CheckoutSellerGroup
                  key={group.sellerId}
                  order={group}
                  index={index}
                />
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="p-8 rounded-[40px] bg-white border-none shadow-2xl shadow-neutral-200/50 space-y-6">
                  <h3 className="text-2xl font-black tracking-tight text-neutral-900">
                    Order Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold text-neutral-500 uppercase tracking-widest">
                      <span>Total Items</span>
                      <span>{totalItems}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-neutral-500 uppercase tracking-widest">
                      <span>Total Sellers</span>
                      <span>{groupedItems.length}</span>
                    </div>
                    <div className="h-px bg-neutral-100" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-neutral-900">
                        Total Price
                      </span>
                      <span className="text-3xl font-black text-emerald-600">
                        ₱{subtotal}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-16 rounded-[24px] bg-emerald-600 hover:bg-emerald-700 text-lg font-black tracking-tight gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Proceed to Payment
                    <ArrowRight className="h-6 w-6" />
                  </Button>

                  <p className="text-center text-xs text-neutral-400 font-medium px-4">
                    By placing your order, you agree to Iskommerce's terms of
                    service and privacy policy.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </main>

      <footer className="h-20" />
    </div>
  );
};

export default CheckoutPage;
