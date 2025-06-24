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
  cpf: string;

  // Step 3 - Sobre
  fantasyName: string;
  companyName: string;
  cnpjOrCpf: string;
  // languages?: string[];

  // Step 4 - Informações
  bankAccount: string;
  bankAgency: string;
  bankCode?: string;
  bankName: string;
  pixKey: string;
  payday: number;
  pixAddressKeyType?: string;
  bankAccountDigit?: string;
  bankAccountType?: string;

  bankOwnerName?: string;
  bankOwnerDocument?: string;

  typePayment?: string;

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
  cpf: "",

  fantasyName: "",
  companyName: "",
  cnpjOrCpf: "",
  // languages: [],

  bankAccount: "",
  bankAgency: "",
  bankCode: "",
  bankName: "",
  pixKey: "",
  pixAddressKeyType: "",
  bankAccountDigit: "",
  bankAccountType: "",
  bankOwnerName: "",
  bankOwnerDocument: "",
  payday: 0,
  typePayment: "pix",

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
