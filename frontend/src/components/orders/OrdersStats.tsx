import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrdersStatsData } from "@/types/orders";
import { ShoppingBag, Clock, Package, CheckCircle } from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import type { ApiResponse } from "@/types/common";

export const OrdersStats = () => {
  const { data } =
    useFetchData<ApiResponse<OrdersStatsData>>("orders/buyer/stats");

  const items = [
    {
      label: "Total Orders",
      value: data?.data?.totalOrders || 0,
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pending",
      value: data?.data?.pendingOrders || 0,
      icon: Clock,
      color: "text-slate-600",
      bg: "bg-slate-50",
    },
    {
      label: "Ready for Pickup",
      value: data?.data?.readyOrders || 0,
      icon: Package,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Completed",
      value: data?.data?.completedOrders || 0,
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <Card
          key={index}
          className="border-none shadow-sm bg-background/50 backdrop-blur"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {item.label}
            </CardTitle>
            <div className={`${item.bg} ${item.color} p-1.5 sm:p-2 rounded-lg`}>
              <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-black">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
