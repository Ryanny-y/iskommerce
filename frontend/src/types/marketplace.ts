export interface Category {
  id: string;
  name: string;
}

export interface ProductImage {
  url: string;
  key: string;
  fileName: string;
  mimeType: string;
  size: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating: number;

  food_notes?: string;
  allergen_info?: string;
  spicy_level?: string;

  condition?: string;

  sellerId: string;
  seller: string;

  categoryId: string;
  category: string;

  image: ProductImage[];
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}