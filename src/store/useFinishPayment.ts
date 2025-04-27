import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FinishPayment {
  id: number;
  paymentMethod: string;
  paymentStatus: string;
  bankSlipUrl: string | null;
  dueDate: string;
  pixDueDate?: string;
  qrCode?: string | null;
  pixCopyPaste?: string | null;
}

interface FinishPaymentStore {
  paymentResponse?: FinishPayment;
  addToPaymentStore: (paymentResponse: FinishPayment) => void;
  clearPaymentStore: () => void;
}

export const useFinishPayment = create<FinishPaymentStore>()(
  persist(
    (set) => ({
      addToPaymentStore: (paymentResponse) => {
        set(() => ({
          paymentResponse,
        }));
      },
      clearPaymentStore: () => {
        set(() => ({
          paymentResponse: undefined,
        }));
      },
    }),
    { name: 'payment-storage' }
  )
);
