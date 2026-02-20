import { Product } from './product.types';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

export type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'INCREASE_QUANTITY'; payload: string }
  | { type: 'DECREASE_QUANTITY'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };
