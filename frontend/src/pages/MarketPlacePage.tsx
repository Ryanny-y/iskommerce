import { motion, AnimatePresence } from "framer-motion";
import { CategoryTabs } from "@/components/marketplace/CategoryTabs";
import type { Product } from "@/types/marketplace";
import { ProductGrid } from "@/components/marketplace/ProductGrid";
import { ShoppingBag } from "lucide-react";
import fatimaLogo from "@/assets/FatimaLogo.png";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";
import { useEffect } from "react";

const MarketplacePage = () => {
  const { addToCart } = useCart();
  const {
    filteredProducts,
    productsLoading,
    productsError,
    products,
    searchQuery,
    activeCategory,
    setActiveCategory,
    refetchProducts,
  } = useProducts();

  useIsLoggedIn();

  const handleAddToCart = async (product: Product) => addToCart(product);

  useEffect(() => {
    refetchProducts();
  }, []);

  if (!products.length && productsLoading) return <div>Loading...</div>;
  if (!products.length && productsError) return <div>Error...</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 md:px-8 py-8 space-y-10">
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
            <CategoryTabs
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>
        </section>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {/* <ProductGrid
              title={
                searchQuery || activeCategory !== "All"
                  ? `Results for "${searchQuery || activeCategory}"`
                  : "Popular in Campus"
              }
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            /> */}

            {/* {searchQuery === "" && activeCategory === "All" && ( */}
            <ProductGrid
              title={
                searchQuery || activeCategory !== "All"
                  ? `Results for "${searchQuery || activeCategory}"`
                  : "All Products"
              }
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
            {/* )} */}

            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="bg-secondary p-6 rounded-full">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">No items found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or category filters.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t py-8 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 h-8">
            <img src={fatimaLogo} alt="Fatima Logo" className="h-full" />
            <span className="font-bold">Iskommerce</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Iskommerce. Built for students, by students.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Help
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketplacePage;
