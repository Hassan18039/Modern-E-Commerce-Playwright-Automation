export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stock: number;
  features?: string[];
  specifications?: Record<string, string>;
}
