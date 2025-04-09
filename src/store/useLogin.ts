import { sideBarLp } from "@/common/constants/sideBar";
import { create } from "zustand";

interface LoginStore {
  email: string;
  password: string;
  error: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
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
}));

export default useLogin;
