// store/paymentStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PaymentState {
  selectedFundingId: number | null;
  selectedAmount: number | null;
  selectedPaymentMethod: string | null;
  impUid: string | null;
  merchantUid: string | null;
  // 액션 함수들은 persist 미들웨어에 의해 자동으로 저장되지 않습니다.
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
      name: "payment-storage", // sessionStorage에 저장될 키 이름
      storage: createJSONStorage(() => sessionStorage), // sessionStorage 사용 (탭 닫히면 사라짐)
      // partialize 옵션을 완전히 제거합니다.
    }
  )
);