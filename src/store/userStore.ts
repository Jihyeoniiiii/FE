import { Donation } from "@/components/profile/MyDonationList";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export type UserDataProps = {
  name: string;
  email: string;
  profileImage: string | null;
  monthlyAmount: number;
  yearlyAmount: number;
  donations: Donation[];
};

type UserStore = {
  userData: UserDataProps | null;
  setUserData: (userData: UserDataProps) => void;
  clearUserData: () => void;
};

type UserStorePersist = PersistOptions<UserStore>;

export const userStore = create<UserStore>()(
  persist<UserStore, [], [], UserStorePersist>(
    (set) => ({
      userData: null,
      setUserData: (userData) => set({ userData }),
      clearUserData: () => set({ userData: null }),
    }),
    {
      name: "chaeum-user-storage",
    }
  )
);
