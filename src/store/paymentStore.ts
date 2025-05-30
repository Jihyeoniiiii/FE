import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PaymentState {
  selectedFundingId: number | null;
  selectedAmount: number | null;
  selectedPaymentMethod: string | null;
  impUid: string | null;
  merchantUid: string | null;
  setSelectedFundingId: (id: number) => void;
  setSelectedAmount: (amount: number) => void;
  setSelectedPaymentMethod: (method: string | null) => void;
  setImpUid: (uid: string) => void;
  setMerchantUid: (uid: string) => void;
  resetPaymentState: () => void;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set) => ({
      selectedFundingId: null,
      selectedAmount: null,
      selectedPaymentMethod: null,
      impUid: null,
      merchantUid: null,
      setSelectedFundingId: (id) => set({ selectedFundingId: id }),
      setSelectedAmount: (amount) => set({ selectedAmount: amount }),
      setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
      setImpUid: (uid) => set({ impUid: uid }),
      setMerchantUid: (uid) => set({ merchantUid: uid }),
      resetPaymentState: () =>
        set({
          selectedFundingId: null,
          selectedAmount: null,
          selectedPaymentMethod: null,
          impUid: null,
          merchantUid: null,
        }),
    }),
    {
      name: "payment-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);