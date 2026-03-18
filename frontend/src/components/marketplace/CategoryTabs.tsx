import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryTabs = ({ activeCategory, onSelectCategory }: CategoryTabsProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {CATEGORIES.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? 'default' : 'outline'}
          className={cn(
            "rounded-full whitespace-nowrap px-6 h-9 text-sm font-medium transition-all",
            activeCategory === category ? "shadow-md" : "hover:bg-secondary"
          )}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
