import { type Product } from '@/types/marketplace';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Utensils, PackageSearch, Flame, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductDetailsSectionProps {
  product: Product;
}

export const ProductDetailsSection = ({ product }: ProductDetailsSectionProps) => {
  const isFood = !!product.food_notes || !!product.allergen_info || !!product.spicy_level;
  const isNonFood = !!product.condition;

  return (
    <div className="flex flex-col gap-8">
      {/* Description */}
      <Card className="rounded-[32px] border-none bg-neutral-50/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-tight text-neutral-900">
            <Info className="h-5 w-5 text-emerald-600" />
            Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed text-neutral-600">
            {product.description}
          </p>
        </CardContent>
      </Card>

      {/* Dynamic Details: Food */}
      {isFood && (
        <Card className="rounded-[32px] border-none bg-emerald-50/30 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-tight text-emerald-900">
              <Utensils className="h-5 w-5 text-emerald-600" />
              Food Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.food_notes && (
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Food Notes</span>
                <p className="text-neutral-700 font-medium">{product.food_notes}</p>
              </div>
            )}
            {product.allergen_info && (
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-red-600">
                  <AlertTriangle className="h-3 w-3" />
                  Allergens
                </div>
                <p className="text-neutral-700 font-medium">{product.allergen_info}</p>
              </div>
            )}
            {product.spicy_level && (
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-orange-600">
                  <Flame className="h-3 w-3" />
                  Spicy Level
                </div>
                <Badge variant="outline" className="mt-1 border-orange-200 bg-orange-50 text-orange-700">
                  {product.spicy_level}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dynamic Details: Non-Food */}
      {isNonFood && (
        <Card className="rounded-[32px] border-none bg-blue-50/30 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-tight text-blue-900">
              <PackageSearch className="h-5 w-5 text-blue-600" />
              Product Condition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Condition</span>
              <div className="pt-1">
                <Badge className={product.condition === 'NEW' ? 'bg-blue-600' : 'bg-neutral-600'}>
                  {product.condition}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
