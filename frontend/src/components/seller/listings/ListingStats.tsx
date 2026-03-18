import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type SellerStats } from '@/types/seller';
import { Package, CheckCircle, ShoppingCart, TrendingUp } from 'lucide-react';

interface ListingsStatsProps {
  stats: SellerStats;
}

export const ListingsStats = ({ stats }: ListingsStatsProps) => {
  const statItems = [
    {
      title: 'Total Listings',
      value: stats.totalListings,
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Active Listings',
      value: stats.activeListings,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Sold Items',
      value: stats.soldItems,
      icon: ShoppingCart,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      title: 'Total Revenue',
      value: `₱${stats.totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <Card key={index} className="border-none shadow-sm bg-background/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <div className={`${item.bg} ${item.color} p-2 rounded-lg`}>
              <item.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
