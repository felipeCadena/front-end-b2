import { create } from "zustand";

type LoginStore = {
  email: string;
  setEmail: (email: string) => void;
};

const useLogin = create<LoginStore>((set) => ({
  email: "",

  setEmail: (email: string) => set({ email }),
}));

export default useLogin;
