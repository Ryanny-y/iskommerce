import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SellerOrdersTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SellerOrdersTabs: React.FC<SellerOrdersTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { value: string; label: string }[] = [
    { value: "ALL", label: "All" },
    { value: "PENDING", label: "Pending" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "PREPARING", label: "Preparing" },
    { value: "READY_FOR_PICKUP", label: "Ready" },
    { value: "COMPLETED", label: "Completed" },
    { value: "CANCELLED", label: "Cancelled" },
  ];

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="w-full bg-neutral-100/50 p-1 rounded-2xl border py-5 border-neutral-200 overflow-x-auto h-16! overflow-y-hidden flex-nowrap justify-start sm:justify-center">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="shrink-0 px-6 h-12 rounded-xl font-bold text-sm data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-100 transition-all"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
