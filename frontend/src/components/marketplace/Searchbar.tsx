import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="relative w-full max-w-md lg:max-w-xl mx-4">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        type="text"
        placeholder="Search items in campus..."
        className="pl-10 rounded-full bg-secondary/50 border-none focus-visible:ring-primary h-10"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};
