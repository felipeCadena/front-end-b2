import { sideBarLp } from "@/common/constants/sideBar";
import { create } from "zustand";
import { storage, TokenResponse } from "@/services/api/auth";
import { api } from "@/libs/api";

interface LoginStore {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: () => Promise<TokenResponse>;
  clearError: () => void;
  sideBarActive: any[];
  setSideBarActive: (sideBarActive: any[]) => void;
}

const useLogin = create<LoginStore>((set, get) => ({
  email: "",
  password: "",
  isLoading: false,
  error: null,
  sideBarActive: sideBarLp,

  setSideBarActive: (sideBarActive: any[]) => set({ sideBarActive }),

  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  clearError: () => set({ error: null }),

  login: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.post("/auth/login", {
        email: get().email,
        password: get().password,
      });

      // Salva os tokens e dados do usuário
      storage.setTokens(response.data);

      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Erro ao fazer login",
      });
      throw error;
    }
  },
}));

export default useLogin;
