import { Button } from "@/components/ui/button";
import useCategory from "@/contexts/CategoryContext";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryTabs = ({
  activeCategory,
  onSelectCategory,
}: CategoryTabsProps) => {
  const { categories } = useCategory();

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      <Button
        variant={activeCategory === "All" ? "default" : "outline"}
        className={cn(
          "rounded-full whitespace-nowrap px-6 h-9 text-sm font-medium transition-all",
          activeCategory === "All" ? "shadow-md" : "hover:bg-secondary",
        )}
        onClick={() => onSelectCategory("All")}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.name ? "default" : "outline"}
          className={cn(
            "rounded-full whitespace-nowrap px-6 h-9 text-sm font-medium transition-all",
            activeCategory === category.name
              ? "shadow-md"
              : "hover:bg-secondary",
          )}
          onClick={() => onSelectCategory(category.name)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};
