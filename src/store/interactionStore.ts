import {
  CombinedInteractiveItem,
} from "@/types/itemTypes";
import { create } from "zustand";

type InteractionStore = {
  feed: CombinedInteractiveItem | null;
  play: CombinedInteractiveItem | null;
  touch: CombinedInteractiveItem | null;
  setInteraction: (interactions: CombinedInteractiveItem[]) => void;
};

export const InteractionStore = create<InteractionStore>()((set) => ({
  feed: null,
  play: null,
  touch: null,
  setInteraction: (interactions: CombinedInteractiveItem[]) => {
    set({
      feed: interactions[0],
      play: interactions[1],
      touch: interactions[2],
    });
  },
}));
