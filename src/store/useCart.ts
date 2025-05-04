import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AddToCartAdventure } from '@/services/api/adventures';

export interface UserCart {
  userId: string;
  cart: AddToCartAdventure[];
}

interface CartStore {
  carts: UserCart[];
  addToCart: (adventure: AddToCartAdventure, userId: string) => void;
  removeFromCart: (id: string, userId: string) => void;
  getCartSize: (userId: string) => number;
  clearCart: (userId: string) => void;
}

const initialState = {
  carts: [] as UserCart[],
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addToCart: (adventure, userId) => {
        set((state) => {
          const existingCartIndex = state.carts.findIndex(
            (cart) => cart.userId === userId
          );

          if (existingCartIndex !== -1) {
            const updatedState = [...state.carts];
            const existingCart = updatedState[existingCartIndex];

            updatedState[existingCartIndex] = {
              userId,
              cart: [...existingCart.cart, adventure],
            };

            return {
              carts: updatedState,
            };
          }

          return {
            carts: [
              ...state.carts,
              {
                userId,
                cart: [adventure],
              },
            ],
          };
        });
      },

      removeFromCart: (id, userId) => {
        set((state) => {
          const cartIndex = state.carts.findIndex(
            (cart) => cart.userId === userId
          );
          const updatedState = [...state.carts];

          const filteredCart = updatedState[cartIndex].cart.filter(
            (adventure) => adventure.purchaseId !== id
          );

          updatedState[cartIndex] = {
            userId,
            cart: filteredCart,
          };

          return {
            carts: updatedState,
          };
        });
      },

      getCartSize: (userId) => {
        const cart = get().carts.find((cart) => cart.userId === userId);
        return cart?.cart.length ?? 0;
      },

      clearCart: (userId) => {
        set((state) => {
          const cartIndex = state.carts.findIndex(
            (cart) => cart.userId === userId
          );
          const updatedState = [...state.carts];

          updatedState[cartIndex] = {
            userId,
            cart: [],
          };

          return {
            carts: updatedState,
          };
        });
      },
    }),
    { name: 'cart-storage' }
  )
);
