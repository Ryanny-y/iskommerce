import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryTabs } from '@/components/marketplace/CategoryTabs';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { MOCK_PRODUCTS } from '@/data/mockData';
import type { CartItem, Product } from '@/types/marketplace';
import { Topbar } from '@/components/marketplace/Topbar';
import { ProductGrid } from '@/components/marketplace/ProductGrid';
import { ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import fatimaLogo from '@/assets/FatimaLogo.png'

const MarketplacePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.seller.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const recommendedProducts = useMemo(() => {
    return MOCK_PRODUCTS.slice(0, 4);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        toast.success(`Increased ${product.name} quantity`);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success(`Added ${product.name} to cart`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleRemoveFromCart = (id: string) => {
    const item = cartItems.find(i => i.id === id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    if (item) toast.error(`Removed ${item.name} from cart`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />

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
            {searchQuery === '' && activeCategory === 'All' && (
              <ProductGrid
                title="Recommended for You" 
                products={recommendedProducts} 
                onAddToCart={handleAddToCart} 
              />
            )}

            <ProductGrid 
              title={searchQuery || activeCategory !== 'All' ? `Results for "${searchQuery || activeCategory}"` : "Popular in Campus"} 
              products={filteredProducts} 
              onAddToCart={handleAddToCart} 
            />

            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="bg-secondary p-6 rounded-full">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">No items found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />

      <footer className="border-t py-8 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 h-8">
            <img src={fatimaLogo} alt="Fatima Logo" className='h-full' />
            <span className="font-bold">Iskommerce</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Iskommerce. Built for students, by students.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketplacePage;
