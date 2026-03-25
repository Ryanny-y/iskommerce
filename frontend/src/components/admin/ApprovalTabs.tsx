import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { UserStatus } from '@/types/admin';

interface ApprovalTabsProps {
  activeTab: UserStatus;
  onTabChange: (tab: UserStatus) => void;
  children: React.ReactNode;
}

export const ApprovalTabs: React.FC<ApprovalTabsProps> = ({ activeTab, onTabChange, children }) => {
  return (
    <Tabs 
      defaultValue="PENDING" 
      value={activeTab} 
      onValueChange={(v) => onTabChange(v as UserStatus)}
      className="w-full space-y-8"
    >
      <TabsList className="bg-neutral-100/50 p-1 rounded-2xl h-auto flex flex-wrap gap-1 w-full lg:w-auto">
        <TabsTrigger 
          value="PENDING"
          className="rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm transition-all flex-1 lg:flex-none"
        >
          Pending
        </TabsTrigger>
        <TabsTrigger 
          value="APPROVED"
          className="rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm transition-all flex-1 lg:flex-none"
        >
          Approved
        </TabsTrigger>
        <TabsTrigger 
          value="REJECTED"
          className="rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm transition-all flex-1 lg:flex-none"
        >
          Rejected
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="PENDING" className="mt-0 focus-visible:outline-none">
        {children}
      </TabsContent>
      <TabsContent value="APPROVED" className="mt-0 focus-visible:outline-none">
        {children}
      </TabsContent>
      <TabsContent value="REJECTED" className="mt-0 focus-visible:outline-none">
        {children}
      </TabsContent>
    </Tabs>
  );
};
