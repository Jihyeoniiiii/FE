import { create } from "zustand";

interface InteractionStoreEachProps {
  id: number;
  itemId: number;
  quantity: number;
}

type InteractionStore = {
  feed: InteractionStoreEachProps;
  play: InteractionStoreEachProps;
  touch: InteractionStoreEachProps;
  setFeed: (feed: InteractionStoreEachProps) => void;
  setPlay: (play: InteractionStoreEachProps) => void;
  setTouch: (touch: InteractionStoreEachProps) => void;
};

export const InteractionStore = create<InteractionStore>()((set) => ({
  feed: { id: 0, itemId: 1, quantity: 0 },
  play: { id: 0, itemId: 2, quantity: 0 },
  touch: { id: 0, itemId: 3, quantity: 0 },
  setFeed: (feed: InteractionStoreEachProps) => {
    set({
      feed,
    });
  },
  setPlay: (play: InteractionStoreEachProps) => {
    set({
      play,
    });
  },
  setTouch: (touch: InteractionStoreEachProps) => {
    set({
      touch,
    });
  },
}));
