import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Topbar } from '@/components/marketplace/Topbar';
import { ListingsStats } from '@/components/seller/listings/ListingStats';
import { ListingsFilters } from '@/components/seller/listings/ListingFilters';
import { ListingsGrid } from '@/components/seller/listings/ListingGrid';
// import { PostProductDialog } from '@/components/seller/PostProductDialog';
// import { EditProductDialog } from '@/components/dialogs/EditProductDialog';
// import { DeleteProductDialog } from '@/components/dialogs/DeleteProductDialog';
import type { SellerProduct, SellerStats } from '@/types/seller';
import { Button } from '@/components/ui/button';
import { Plus, LayoutDashboard } from 'lucide-react';
import { toast } from 'sonner';
import useAuth from '@/contexts/AuthContext';
import { PostProductDialog } from '@/components/seller/PostProductDialog';

// Mock Categories
const MOCK_CATEGORIES = [
  { id: '1', name: 'Food' },
  { id: '2', name: 'School Supplies' },
  { id: '3', name: 'Books' },
  { id: '4', name: 'Electronics' },
];

// Mock Initial Data
const INITIAL_LISTINGS: SellerProduct[] = [
  {
    id: '1',
    name: 'Blue University Hoodie',
    description: 'Comfortable cotton hoodie with university logo.',
    price: 450,
    category: 'Clothing',
    stock: 10,
    status: 'active',
    condition: 'new',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400&h=400',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Scientific Calculator',
    description: 'Casio FX-991EX, perfect for engineering students.',
    price: 1200,
    category: 'Electronics',
    stock: 0,
    status: 'out_of_stock',
    condition: 'used',
    image: 'https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=400&h=400',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Calculus Made Easy',
    description: 'Textbook for Math 17 and Math 21.',
    price: 350,
    category: 'Books',
    stock: 5,
    status: 'sold',
    condition: 'used',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=400',
    createdAt: new Date().toISOString(),
  },
];

const MyListingsPage = () => {
  const { authResponse } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState<SellerProduct[]>(INITIAL_LISTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Dialog States
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SellerProduct | null>(null);

  useEffect(() => {
    // Check if user is a seller (mocked with localStorage)
    const isSeller = authResponse?.userData.roles.includes('SELLER');
    if (!isSeller) {
      navigate('/start-selling', { replace: true });
      return;
    }

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [navigate]);

  const stats: SellerStats = useMemo(() => {
    return {
      totalListings: listings.length,
      activeListings: listings.filter(l => l.status === 'active').length,
      soldItems: listings.filter(l => l.status === 'sold').length,
      totalRevenue: listings
        .filter(l => l.status === 'sold')
        .reduce((acc, curr) => acc + (curr.price * (curr.stock === 0 ? 1 : 1)), 0), // Mock logic for revenue
    };
  }, [listings]);

  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || item.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [listings, searchQuery, activeFilter]);

  const handlePostProduct = (newProduct: Omit<SellerProduct, 'id' | 'createdAt'>) => {
    const product: SellerProduct = {
      ...newProduct,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setListings([product, ...listings]);
    toast.success('Product listed successfully!');
  };

  const handleUpdateProduct = (updatedProduct: SellerProduct) => {
    setListings(listings.map(l => l.id === updatedProduct.id ? updatedProduct : l));
    toast.success('Listing updated successfully!');
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setListings(listings.filter(l => l.id !== selectedProduct.id));
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
      toast.error('Listing deleted');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar 
        cartItemCount={0} 
        onCartClick={() => {}} 
        onSearch={() => {}} 
      />

      <main className="flex-1 container mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <LayoutDashboard className="h-8 w-8 text-emerald-600" />
              My Listings
            </h1>
            <p className="text-muted-foreground">Manage the products you are selling in Iskommerce</p>
          </div>
          <Button 
            onClick={() => setIsPostDialogOpen(true)} 
            className="rounded-full bg-emerald-600 hover:bg-emerald-700 h-12 px-6 gap-2 shadow-lg shadow-emerald-200"
          >
            <Plus className="h-5 w-5" />
            Post Item
          </Button>
        </div>

        {/* Stats Section */}
        <ListingsStats stats={stats} />

        {/* Management Section */}
        <div className="space-y-6">
          <ListingsFilters 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter + searchQuery}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ListingsGrid 
                products={filteredListings}
                isLoading={isLoading}
                onEdit={(p) => {
                  setSelectedProduct(p);
                  setIsEditDialogOpen(true);
                }}
                onDelete={(id) => {
                  const p = listings.find(l => l.id === id);
                  if (p) setSelectedProduct(p);
                  setIsDeleteDialogOpen(true);
                }}
                onView={(id) => toast.info(`Viewing product ${id}`)}
                onPostFirst={() => setIsPostDialogOpen(true)}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Dialogs */}
      <PostProductDialog
        isOpen={isPostDialogOpen}
        onClose={() => setIsPostDialogOpen(false)}
        categories={MOCK_CATEGORIES}
      />

      {/* <EditProductDialog 
        product={selectedProduct}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedProduct(null);
        }}
        onUpdate={handleUpdateProduct}
      /> */}

      {/* <DeleteProductDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDeleteProduct}
      /> */}

      <footer className="border-t py-8 mt-12 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Iskommerce Seller Dashboard.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Seller Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyListingsPage;
