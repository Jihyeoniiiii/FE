import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type UserDataProps = {
  name: string | undefined;
  email: string;
  profileImage: string | null;
  donations: string[] | null;
  monthlyAmount: number;
  yearlyAmount: number;
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
