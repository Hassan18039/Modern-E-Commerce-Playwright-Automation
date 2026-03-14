import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { CartState, CartAction, CartItem } from '../types/cart.types';
import { Product } from '../types/product.types';

const CART_STORAGE_KEY = 'ecommerce_cart';

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
};

const calculateTotals = (items: CartItem[]): { totalItems: number; subtotal: number } => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return { totalItems, subtotal };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.id
      );

      let newItems: CartItem[];
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            id: action.payload.id,
            product: action.payload,
            quantity: 1,
            addedAt: new Date(),
          },
        ];
      }

      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'INCREASE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'DECREASE_QUANTITY': {
      const newItems = state.items
        .map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items
        .map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter(item => item.quantity > 0);
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'LOAD_CART': {
      const totals = calculateTotals(action.payload);
      return { items: action.payload, ...totals };
    }

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [state.items]);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const increaseQuantity = (productId: string) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
  };

  const decreaseQuantity = (productId: string) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value: CartContextType = {
    state,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
