import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { storage } from "@/services/auth";
import { toast } from "react-toastify";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: string;
}

interface AuthStore {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  setUser: () => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: () => {
    const auth = storage.getTokens();
    if (!auth?.access_token) {
      set({ user: null });
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(auth.access_token);
      const roleMapping = {
        superadmin: "admin",
        admin: "admin",
        partner: "partner",
        customer: "customer",
      };

      set((state) => {
        const newUser = {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: roleMapping[
            decoded.role.toLowerCase() as keyof typeof roleMapping
          ],
        };

        if (JSON.stringify(state.user) !== JSON.stringify(newUser)) {
          return { user: newUser };
        }
        return state;
      });
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      set({ user: null });
    }
  },
  clearUser: () => {
    set({ user: null });
    storage.clear();
  },
}));
