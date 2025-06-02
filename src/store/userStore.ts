import { DonatorProps, RecipientProps } from "@/types/userTypes";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type UserStore = {
  userData: DonatorProps | null; // 기부자 회원 정보
  setUserData: (data: DonatorProps) => void;
  clearUserData: () => void;
  recipientData: RecipientProps | null; // 수혜자 회원 정보
  setRecipientData: (data: RecipientProps) => void;
  waiting: boolean; // 권한 기다리는 중인지 아닌지 체크
  setWaiting: (condition: boolean) => void;
};

type UserStorePersist = PersistOptions<UserStore>;

export const userStore = create<UserStore>()(
  persist<UserStore, [], [], UserStorePersist>(
    (set) => ({
      userData: null,
      setUserData: (data) => set({ userData: data }),
      clearUserData: () => set({ userData: null }),
      recipientData: null,
      setRecipientData: (data) => set({ recipientData: data }),
      waiting: false,
      setWaiting: (condition) => set({ waiting: condition }),
    }),
    {
      name: "chaeum-user-storage",
    }
  )
);
