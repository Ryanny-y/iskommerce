import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Utensils, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductTypeSelectorProps {
  value: "FOOD" | "NON_FOOD";
  onChange: (value: "FOOD" | "NON_FOOD") => void;
}

export const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <Label>Item Type</Label>
      <RadioGroup 
        value={value} 
        onValueChange={(v) => onChange(v as "FOOD" | "NON_FOOD")}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <RadioGroupItem value="FOOD" id="FOOD" className="peer sr-only" />
          <Label
            htmlFor="FOOD"
            className={cn(
              "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all",
              value === "FOOD" && "border-primary bg-primary/5"
            )}
          >
            <Utensils className="mb-3 h-6 w-6" />
            <span className="text-sm font-semibold">Food</span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="NON_FOOD" id="NON_FOOD" className="peer sr-only" />
          <Label
            htmlFor="NON_FOOD"
            className={cn(
              "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all",
              value === "NON_FOOD" && "border-primary bg-primary/5"
            )}
          >
            <Package className="mb-3 h-6 w-6" />
            <span className="text-sm font-semibold">Non-Food</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};
