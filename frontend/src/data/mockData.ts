import { type Product } from '../types/marketplace';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Burger Combo',
    price: 50,
    seller: 'Maria',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80',
    category: 'Food'
  },
  {
    id: '2',
    name: 'Scientific Calculator',
    price: 850,
    seller: 'John',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1574607383476-f517f260d30b?w=500&q=80',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Engineering Notebook',
    price: 120,
    seller: 'Kevin',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&q=80',
    category: 'School Supplies'
  },
  {
    id: '4',
    name: 'Custom Keychain',
    price: 35,
    seller: 'Sarah',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80',
    category: 'Keychains'
  },
  {
    id: '5',
    name: 'Java Programming Book',
    price: 450,
    seller: 'Prof. Mike',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80',
    category: 'Books'
  },
  {
    id: '6',
    name: 'University Hoodie',
    price: 650,
    seller: 'Student Council',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
    category: 'Clothing'
  },
  {
    id: '7',
    name: 'Wireless Mouse',
    price: 350,
    seller: 'Tech Shop',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    category: 'Electronics'
  },
  {
    id: '8',
    name: 'Pork Sisig Rice',
    price: 75,
    seller: 'Aling Nena',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1626132646529-50063754a0bf?w=500&q=80',
    category: 'Food'
  }
];

export const CATEGORIES = [
  'All',
  'Food',
  'School Supplies',
  'Books',
  'Clothing',
  'Electronics',
  'Keychains',
  'Others'
];
