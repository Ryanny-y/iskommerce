import type { User } from "./User";

export type ProductStatus = 'active' | 'sold' | 'out_of_stock';
export type ProductCondition = 'new' | 'used';

export interface SellerProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: ProductStatus;
  condition: ProductCondition;
  image: string;
  createdAt: string;
}

export interface SellerStats {
  totalListings: number;
  activeListings: number;
  soldItems: number;
  totalRevenue: number;
}

export type Seller = User;