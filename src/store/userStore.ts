import { create } from "zustand";
import { persist } from "zustand/middleware";

type userDataProps = {
  name: string;
  email: string;
  profileImage: string;
};

export const userStore = create(
  persist(
    (set) => ({
      userData: null,
      setUserData: (userData: userDataProps) => set({ userData }),
      clearUserData: () => set({ userData: null }),
    }),
    {
      name: "chaeum-user-storage",
    }
  )
);
