import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StepperState {
  // Step 1 - Termos
  terms: boolean;

  // Step 2 - Cadastro
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;

  // Step 3 - Sobre
  fantasyName: string;
  cnpj: string;

  // Step 4 - Informações
  bankAccount: string;
  bankAgency: string;
  bankName: string;
  pixKey: string;
  payday: number;

  // Métodos
  setTerms: (terms: boolean) => void;
  setStepData: (step: number, data: Partial<StepperState>) => void;
  clearForm: () => void;
}

const initialState = {
  terms: false,

  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",

  fantasyName: "",
  cnpj: "",

  bankAccount: "",
  bankAgency: "",
  bankName: "",
  pixKey: "",
  payday: 0,

  address: {
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  },
};

export const useStepperStore = create<StepperState>()(
  persist(
    (set) => ({
      ...initialState,

      setTerms: (terms) => set({ terms }),

      setStepData: (step, data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      clearForm: () => set(initialState),
    }),
    {
      name: "stepper-storage",
    }
  )
);
