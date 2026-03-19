import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export const CartButton: React.FC<CartButtonProps> = ({ itemCount, onClick }) => {
  return (
    <Button variant="ghost" className="relative [&_svg:not([class*='size-'])]:size-5" onClick={onClick}>
      <ShoppingCart className="h-6 w-6" size={40}/>
      {itemCount > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground rounded-full text-[10px]"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );
};
