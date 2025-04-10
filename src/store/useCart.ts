import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Adventure } from '@/services/api/adventures';

interface Cart {
  userId: string;
  cart: Adventure[];
  addToCart: (data: Adventure) => void;
  removeFromCart: (id: string) => void;
  getCartSize: () => number;
  clearCart: () => void;
}

const initialState = {
  userId: '',
  cart: [] as Adventure[],
};

export const useCart = create<Cart>()(
  persist(
    (set, get) => ({
      ...initialState,

      addToCart: (data) => {
        set((state) => ({
          cart: [...state.cart, data],
        }));
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter(
            (adventure) => adventure.id.toString() !== id
          ),
        }));
      },

      getCartSize: () => {
        const cartSize = get().cart.length;
        return cartSize;
      },

      clearCart: () => {
        set(() => ({
          cart: [],
        }));
      },
    }),
    { name: 'cart-storage' }
  )
);
