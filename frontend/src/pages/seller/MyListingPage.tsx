import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// import { ListingsStats } from "@/components/seller/listings/ListingStats";
// import { ListingsFilters } from "@/components/seller/listings/ListingFilters";
import { ListingsGrid } from "@/components/seller/listings/ListingGrid";
import { DeleteProductDialog } from "@/components/dialogs/DeleteProductDialog";
// import type { SellerStats } from "@/types/seller";
import { Button } from "@/components/ui/button";
import { Plus, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";
import useAuth from "@/contexts/AuthContext";
import { PostProductDialog } from "@/components/seller/PostProductDialog";
import useFetchData from "@/hooks/useFetchData";
import type { ApiResponse } from "@/types/common";
import type { Product } from "@/types/marketplace";
import useMutation from "@/hooks/useMutation";
import EditProductDialog from "@/components/dialogs/EditProductDialog";

const MyListingsPage = () => {
  const { authResponse } = useAuth();
  const { execute } = useMutation();
  const navigate = useNavigate();
  // const [searchQuery, setSearchQuery] = useState("");
  // const [activeFilter, setActiveFilter] = useState("all");

  // PRODUCTS
  const {
    data: products,
    loading: productsLoading,
    refetchData: refetchProducts,
  } = useFetchData<ApiResponse<Product[]>>(`products/my-listings`);

  // Dialog States
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
 
  useEffect(() => {
    // Check if user is a seller (mocked with localStorage)
    const isSeller = authResponse?.userData.roles.includes("SELLER");
    if (!isSeller) {
      navigate("/start-selling", { replace: true });
      return;
    }
  }, [navigate]);

  // const stats: SellerStats = useMemo(() => {
  //   return {
  //     totalListings: listings.length,
  //     activeListings: listings.filter((l) => l.status === "active").length,
  //     soldItems: listings.filter((l) => l.status === "sold").length,
  //     totalRevenue: listings
  //       .filter((l) => l.status === "sold")
  //       .reduce(
  //         (acc, curr) => acc + curr.price * (curr.stock === 0 ? 1 : 1),
  //         0,
  //       ),
  //   };
  // }, [listings]);
  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    try {
      const response: ApiResponse<void> = await execute(
        `products/${selectedProduct.id}`,
        {
          method: "DELETE",
        },
      );

      await refetchProducts();
      toast.success(response.message);
    } catch (error) {
      toast.error("Failed to delete item.");
    }
  };

  if (!products || !products.data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <LayoutDashboard className="h-8 w-8 text-emerald-600" />
              My Listings
            </h1>
            <p className="text-muted-foreground">
              Manage the products you are selling in Iskommerce
            </p>
          </div>
          <Button
            onClick={() => setIsPostDialogOpen(true)}
            className="rounded-full bg-emerald-600 hover:bg-emerald-700 h-12 px-6 gap-2"
          >
            <Plus className="h-5 w-5" />
            Post Item
          </Button>
        </div>

        {/* Stats Section */}
        {/* <ListingsStats stats={stats} /> */}

        {/* Management Section */}
        <div className="space-y-6">
          {/* <ListingsFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          /> */}

          <AnimatePresence mode="wait">
            <motion.div
              // key={activeFilter + searchQuery}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ListingsGrid
                products={products.data}
                isLoading={productsLoading}
                onEdit={(product) => {
                  setSelectedProduct(product);
                  setIsEditDialogOpen(true);
                }}
                onDelete={(product) => {
                  setSelectedProduct(product);
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
        refetchProducts={refetchProducts}
        isOpen={isPostDialogOpen}
        onClose={() => setIsPostDialogOpen(false)}
      />

      <EditProductDialog
        product={selectedProduct}
        isOpen={isEditDialogOpen}
        refetchProducts={refetchProducts}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedProduct(null);
        }}
      />

      <DeleteProductDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDeleteProduct}
      />

      <footer className="border-t py-8 mt-12 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Iskommerce Seller Dashboard.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Seller Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyListingsPage;
