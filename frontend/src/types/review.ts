
export interface SellerReviewItem {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  reviewer: {
    id: string;
    fullName: string;
    avatar?: string,
    isVerified: boolean
  };
}

export interface PaginatedSellerReviews {
  reviews: SellerReviewItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
