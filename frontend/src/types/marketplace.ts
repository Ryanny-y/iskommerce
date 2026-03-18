export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  seller: string;
  rating: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}
