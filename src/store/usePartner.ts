import { create } from "zustand";

interface User {
  email?: string;
  name?: string;
  password?: string;
  cpf?: string;
  phone?: string;
}

export interface Partner {
  businessEmail?: string;
  businessPhone?: string;
  fantasyName?: string;
  companyName?: string;
  cnpj?: string;
  payday?: number; // Deve ser <= 30
  address?: string;
  about?: string;
  bankAccount?: string;
  bankAgency?: string;
  bankName?: string;
  pixKey?: string;
  userId?: string; // ID do usuário ou objeto de usuário obrigatório
  user?: User;
}

interface PartnerStore {
  terms: boolean;
  setTerms: (terms: boolean) => void;
  partner: Partner;
  setPartner: (partner: Partner) => void;
}

const userPartner = create<PartnerStore>((set) => ({
  terms: false,
  setTerms: (terms) => set({ terms }),
  partner: {
    businessEmail: "",
    businessPhone: "",
    fantasyName: "",
    companyName: "",
    cnpj: "",
    payday: 0,
    address: "",
    about: "",
    bankAccount: "",
    bankAgency: "",
    bankName: "",
    pixKey: "",
    userId: "",
  },
  setPartner: (partner) => set({ partner }),
}));

export default userPartner;
