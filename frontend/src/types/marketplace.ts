export interface Category {
  id: string;
  name: string;
}

export interface ProductImage {
  url: string;
  key: string;
  fileName: string;
  bucket: string;
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

  images: ProductImage[];
  createdAt: string;
}

type CartProduct = Pick<Product, "id" | "name" | "price" | "stock"> & {
  images: { url: string }[];
};

export interface CartItem {
  id: string;
  quantity: number;
  product: CartProduct;
}

export interface CartResponse {
  id: string;
  items: CartItem[];
}
