import { create } from "zustand";

type CatDataProps = {
  id: number;
  level: number;
  experiencePoint: number;
  levelUpPercentage: number;
};

type CatStore = {
  catData: CatDataProps
  setCatData: (catData: CatDataProps) => void;
};

export const catStore = create<CatStore>()((set) => ({
  catData: {
    id: 0,
    level: 0,
    experiencePoint: 0,
    levelUpPercentage: 0,
  },
  setCatData: (catData) => set({ catData }),
}));
