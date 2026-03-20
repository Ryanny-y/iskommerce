import { useParams, useNavigate } from 'react-router-dom';
import { type Product } from '@/types/marketplace';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductDetailsSection } from '@/components/product/ProductDetailsSection';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import useFetchData from '@/hooks/useFetchData';
import type { ApiResponse } from '@/types/common';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

//   TODO: HANDLE ERROR
  const { data: productData, loading, error } = useFetchData<ApiResponse<Product>>(`products/${id}`)

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-2xl" />
              <div className="flex gap-2">
                <Skeleton className="h-20 w-20 rounded-lg" />
                <Skeleton className="h-20 w-20 rounded-lg" />
                <Skeleton className="h-20 w-20 rounded-lg" />
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4 rounded-lg" />
              <Skeleton className="h-8 w-1/4 rounded-lg" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <div className="flex gap-4">
                <Skeleton className="h-14 flex-1 rounded-2xl" />
                <Skeleton className="h-14 flex-1 rounded-2xl" />
              </div>
              <Skeleton className="h-40 w-full rounded-[32px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!productData || !productData.data || error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <ShoppingBag className="h-16 w-16 text-neutral-200 mb-4" />
        <h2 className="text-2xl font-black text-neutral-900 mb-2">Product Not Found</h2>
        <p className="text-neutral-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/dashboard')} className="rounded-2xl bg-emerald-600 font-bold">
          Back to Marketplace
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-500 transition-colors hover:text-emerald-600"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Listings
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2"
        >
          {/* Left Column: Gallery */}
          <div className="flex flex-col gap-8">
            <ProductGallery images={productData.data.images} />
            {/* <div className="hidden lg:block">
              <SellerCard product={productData.data} />
            </div> */}
          </div>

          {/* Right Column: Info & Details */}
          <div className="flex flex-col gap-10">
            <ProductInfo product={productData.data} />
            <ProductDetailsSection product={productData.data} />
            {/* <div className="lg:hidden">
              <SellerCard product={productData.data} />
            </div> */}
          </div>
        </motion.div>
      </main>

      {/* Footer Space */}
      <div className="h-20" />
    </div>
  );
};

export default ProductDetailsPage;
