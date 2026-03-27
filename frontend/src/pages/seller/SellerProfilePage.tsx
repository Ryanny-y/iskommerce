import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SellerProfileHeader } from '@/components/seller/SellerProfileHeader';
import { SellerTabs } from '@/components/seller/SellerTabs';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'motion/react';
import type { Seller } from '@/types/seller';
import type { PaginatedSellerReviews, SellerReviewItem } from '@/types/review';
import type { Product } from '@/types/marketplace';
import useFetchData from '@/hooks/useFetchData';
import type { ApiResponse } from '@/types/common';

const SellerProfilePage: React.FC = () => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews ] = useState<SellerReviewItem[]>([]);

  const { data: sellerData, loading } = useFetchData<ApiResponse<Seller>>(`users/${sellerId}`);

  const { data: sellerReviews, loading: loadingReviews } = useFetchData<ApiResponse<PaginatedSellerReviews>>(`reviews/seller/${sellerId}`);

  const seller = sellerData?.data ?? null;
  useEffect(() => {
    if(sellerReviews && !loadingReviews) {
      setReviews(sellerReviews.data?.reviews ?? []);
    }
  }, [sellerReviews, loadingReviews])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-10 w-48 rounded-lg" />
              <Skeleton className="h-6 w-96 rounded-lg" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
            <Skeleton className="h-12 w-40 rounded-2xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-lg" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!sellerData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-black text-neutral-900 mb-2">Seller Not Found</h2>
        <p className="text-neutral-500 mb-6">The seller you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  if(!sellerData || !seller) return;

  return (
    <div className="min-h-screen bg-white">
      <main id="seller-profile-page">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SellerProfileHeader 
            seller={seller} 
            averageRating={seller.rating ?? 0}
            totalReviews={reviews.length}
          />
          
          <SellerTabs 
            seller={seller}
            products={products}
            reviews={reviews}
            averageRating={seller.rating ?? 0}
            totalReviews={reviews.length}
          />
        </motion.div>
      </main>

      {/* Footer Space */}
      <div className="h-20" />
    </div>
  );
};

export default SellerProfilePage;
