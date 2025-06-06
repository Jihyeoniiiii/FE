import { create } from "zustand";

type interactionStore = {
  feed: number;
  play: number;
  touch: number;
  setInteraction: (interactions: number[]) => void;
};

export const InteractionStore = create<interactionStore>()((set) => ({
  feed: 0,
  play: 0,
  touch: 0,
  setInteraction: (interactions: number[]) => {
    set({
      feed: interactions[0],
      play: interactions[1],
      touch: interactions[2],
    });
  },
}));
