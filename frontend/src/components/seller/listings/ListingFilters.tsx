import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ListingsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const ListingsFilters = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: ListingsFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search your listings..."
          className="pl-10 rounded-full bg-background/50"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Tabs 
        value={activeFilter} 
        onValueChange={onFilterChange} 
        className="w-full md:w-auto"
      >
        <TabsList className="grid grid-cols-4 w-full md:w-auto rounded-full bg-muted/50 p-1">
          <TabsTrigger value="all" className="rounded-full">All</TabsTrigger>
          <TabsTrigger value="active" className="rounded-full">Active</TabsTrigger>
          <TabsTrigger value="sold" className="rounded-full">Sold</TabsTrigger>
          <TabsTrigger value="out_of_stock" className="rounded-full text-xs sm:text-sm">Out of Stock</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
