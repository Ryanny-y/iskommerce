import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Seller } from "@/types/seller";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar, Info, Star as LucideStar } from "lucide-react";
import dayjs from "dayjs";
import { ProductGrid } from "../marketplace/ProductGrid";
import type { Product } from "@/types/marketplace";
import { useCart } from "@/contexts/CartContext";
import type { SellerReviewItem } from "@/types/review";
import { ReviewList } from "../reviews/ReviewList";

interface SellerTabsProps {
  seller: Seller;
  products: Product[];
  reviews: SellerReviewItem[];
  averageRating: number;
  totalReviews: number;
}

export function SellerTabs({
  seller,
  products,
  reviews,
  averageRating,
  totalReviews,
}: SellerTabsProps) {
  const { addToCart } = useCart();

  const mappedReviews = reviews.map((review) => {
    return {
      id: review.id,
      user: {
        id: review.reviewer.id,
        avatar: review.reviewer.avatar,
        fullName: review.reviewer.fullName,
        isVerified: review.reviewer.isVerified,
      },
      rating: review.rating,
      comment: review.comment ?? "",
      date: review.createdAt,
    };
  });

  return (
    <div
      className="container mx-auto max-w-7xl px-4 py-8 md:px-8"
      id="seller-tabs-container"
    >
      <Tabs defaultValue="products" className="w-full" id="seller-tabs">
        <TabsList
          className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 mb-8"
          id="tabs-list"
        >
          <TabsTrigger
            value="products"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-4 font-bold text-neutral-500 data-[state=active]:text-emerald-600 transition-all"
            id="tab-products"
          >
            Products ({products.length})
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-4 font-bold text-neutral-500 data-[state=active]:text-emerald-600 transition-all"
            id="tab-reviews"
          >
            Reviews ({totalReviews})
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-4 font-bold text-neutral-500 data-[state=active]:text-emerald-600 transition-all"
            id="tab-about"  
          >
            About
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Products */}
        <TabsContent value="products" className="mt-0" id="content-products">
          <ProductGrid onAddToCart={addToCart} products={products} />
        </TabsContent>

        {/* Tab 2: Reviews */}
        <TabsContent value="reviews" className="mt-0" id="content-reviews">
          <div className="max-w-4xl mx-auto space-y-8" id="reviews-content">
            <div
              className="flex flex-col items-center justify-center py-10 bg-emerald-50/30 rounded-[32px] border border-emerald-100"
              id="reviews-summary"
            >
              <div
                className="text-5xl font-black text-emerald-600 mb-2"
                id="avg-rating-value"
              >
                {averageRating.toFixed(1)}
              </div>
              <div
                className="flex items-center gap-1 text-yellow-500 mb-2"
                id="avg-rating-stars"
              >
                {[...Array(5)].map((_, i) => (
                  <LucideStar
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(averageRating) ? "fill-current" : "text-neutral-300"}`}
                  />
                ))}
              </div>
              <div
                className="text-sm font-bold text-neutral-500"
                id="total-reviews-count"
              >
                Based on {totalReviews} reviews
              </div>
            </div>
            <ReviewList reviews={mappedReviews} />
          </div>
        </TabsContent>

        {/* Tab 3: About */}
        <TabsContent value="about" className="mt-0" id="content-about">
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            id="about-content"
          >
            {/* Seller Info Card */}
            <Card
              className="lg:col-span-2 rounded-[32px] border-none bg-neutral-50/50 shadow-sm"
              id="seller-info-card"
            >
              <CardHeader>
                <CardTitle
                  className="flex items-center gap-2 text-xl font-black tracking-tight text-neutral-900"
                  id="seller-info-title"
                >
                  <Info className="h-5 w-5 text-emerald-600" />
                  Seller Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6" id="seller-info-content">
                <div className="space-y-4" id="seller-details">
                  <div className="flex items-center gap-3" id="detail-name">
                    <div
                      className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm"
                      id="icon-name"
                    >
                      <User className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div id="text-name">
                      <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                        Full Name
                      </p>
                      <p className="font-bold text-neutral-900">
                        {seller.fullName}
                      </p>
                    </div>
                  </div>

                  {seller.email && (
                    <div className="flex items-center gap-3" id="detail-email">
                      <div
                        className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm"
                        id="icon-email"
                      >
                        <Mail className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div id="text-email">
                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                          Email Address
                        </p>
                        <p className="font-bold text-neutral-900">
                          {seller.email}
                        </p>
                      </div>
                    </div>
                  )}

                  <div
                    className="flex items-center gap-3"
                    id="detail-member-since"
                  >
                    <div
                      className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm"
                      id="icon-member-since"
                    >
                      <Calendar className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div id="text-member-since">
                      <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                        Member Since
                      </p>
                      <p className="font-bold text-neutral-900">
                        {dayjs(seller.createdAt).format("MMMM DD, YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Card */}
            <Card
              className="rounded-[32px] border-none bg-emerald-600 text-white shadow-xl"
              id="quick-stats-card"
            >
              <CardHeader>
                <CardTitle
                  className="text-xl font-black tracking-tight"
                  id="quick-stats-title"
                >
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6" id="quick-stats-content">
                <div
                  className="flex justify-between items-center"
                  id="stat-products"
                >
                  <span className="font-bold opacity-80">Total Products</span>
                  <span className="text-2xl font-black">{products.length}</span>
                </div>
                <div
                  className="flex justify-between items-center"
                  id="stat-reviews"
                >
                  <span className="font-bold opacity-80">Total Reviews</span>
                  <span className="text-2xl font-black">{totalReviews}</span>
                </div>
                <div
                  className="flex justify-between items-center"
                  id="stat-rating"
                >
                  <span className="font-bold opacity-80">Avg. Rating</span>
                  <span className="text-2xl font-black">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
                {/* <div className="pt-4 border-t border-white/20" id="stat-status">
                  <div className="flex items-center gap-2" id="status-badge">
                    <div
                      className="w-2 h-2 rounded-full bg-white animate-pulse"
                      id="status-dot"
                    ></div>
                    <span className="font-bold">Active Seller</span>
                  </div>
                </div> */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}