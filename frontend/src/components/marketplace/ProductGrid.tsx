import { type Product } from "@/types/marketplace";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  title?: string;
}

export const ProductGrid = ({
  products,
  onAddToCart,
  title,
}: ProductGridProps) => {
  return (
    <div className="space-y-6">
      {title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};
