import { sideBarLp } from "@/common/constants/sideBar";
import { create } from "zustand";

type LoginStore = {
  email: string;
  setEmail: (email: string) => void;

  sideBarActive: any[];
  setSideBarActive: (sideBarActive: any[]) => void;
};

const useLogin = create<LoginStore>((set) => ({
  email: "",

  setEmail: (email: string) => set({ email }),

  sideBarActive: sideBarLp,

  setSideBarActive: (sideBarActive: any[]) => set({ sideBarActive }),
}));

export default useLogin;
