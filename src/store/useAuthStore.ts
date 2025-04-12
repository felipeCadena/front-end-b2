import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  photo?: {
    url: string;
    mimetype: string;
  };
}

interface AuthStore {
  user: User | null;

  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => {
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
