import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import useCategory from '@/contexts/CategoryContext';

export interface Category {
  id: string;
  name: string;
}

interface CategorySelectorProps {
  selectedId?: string;
  newCategoryName?: string;
  onSelect: (id: string) => void;
  onNewCategoryChange: (name: string) => void;
  error?: string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedId,
  newCategoryName,
  onSelect,
  onNewCategoryChange,
  error
}) => {
  const { categories } = useCategory();

  return (
    <div className="space-y-4">
      <Label className={cn(error && "text-destructive")}>Category</Label>
      <RadioGroup
        value={selectedId}
        onValueChange={onSelect}
        className="flex flex-wrap gap-2"
      >
        {categories.map((category) => (
          <div key={category.id}>
            <RadioGroupItem
              value={category.id}
              id={`cat-${category.id}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`cat-${category.id}`}
              className="px-4 py-2 rounded-full border border-muted bg-background hover:bg-accent hover:text-emerald-600 peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all text-sm font-medium inline-block"
            >
              {category.name}
            </Label>
          </div>
        ))}
        <div>
          <RadioGroupItem value="other" id="cat-other" className="peer sr-only" />
          <Label
            htmlFor="cat-other"
            className="px-4 py-2 rounded-full border border-muted bg-background hover:bg-accent hover:text-emerald-600 peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all text-sm font-medium inline-block"
          >
            Other
          </Label>
        </div>
      </RadioGroup>

      {selectedId === 'other' && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Label htmlFor="newCategoryName" className="text-xs text-muted-foreground">New Category Name</Label>
          <Input
            id="newCategoryName"
            placeholder="Type category name..."
            value={newCategoryName}
            onChange={(e) => onNewCategoryChange(e.target.value)}
            className="h-9"
          />
        </div>
      )}
      
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
};
