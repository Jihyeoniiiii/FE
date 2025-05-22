import { create } from 'zustand';

interface PaymentState {
  selectedAmount: number | null;
  selectedFundingId: number | null;
  selectedPaymentMethod: string | null;
  
  setSelectedAmount: (amount: number | null) => void;
  setSelectedFundingId: (fundingId: number | null) => void;
  setSelectedPaymentMethod: (method: string | null) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  selectedAmount: null,
  selectedFundingId: null,
  selectedPaymentMethod: null,

  setSelectedAmount: (amount) => set({ selectedAmount: amount }),
  setSelectedFundingId: (fundingId) => set({ selectedFundingId: fundingId }),
  setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
}));