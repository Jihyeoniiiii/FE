import { decorationItems, interiorItems } from "@/lib/inventoryItems";
import { CombinedInventoryItem, ItemType } from "@/types/itemTypes";
import { create } from "zustand";

export interface CatDataProps {
  id: number;
  level: number;
  experiencePoint: number;
  levelUpPercentage: number;
}

type CatStore = {
  catData: CatDataProps;
  setCatData: (catData: CatDataProps) => void;

  inventory: number[]; // 아이템 ID 배열
  setInventory: (inventory: number[]) => void; // itemId만 있음

  acquiredItem: CombinedInventoryItem[]; // 보유한 inventory 
  setAcquiredItem: (responseItemData: CombinedInventoryItem[]) => void; 
  combinedInventoryList: ItemType[]; // 착용하고있는 inventory
  toggleItemInDisplay: (id: number) => void; 
};

export const catStore = create<CatStore>()((set, get) => ({
  catData: {
    id: 0,
    level: 0,
    experiencePoint: 0,
    levelUpPercentage: 0,
  },
  inventory: [],
  combinedInventoryList: [],

  acquiredItem: [],
  setAcquiredItem: (responseItemData: CombinedInventoryItem[]) => {
    set({ acquiredItem: responseItemData });
  },

  setCatData: (newCatData) => {
    set({ catData: newCatData });
  },

  setInventory: (newBackendInventory: number[]) => {
    set({ inventory: newBackendInventory });
    // 백엔드 데이터 기준으로 combinedInventoryList를 올바르게 설정
    const newCombinedListFromBackend = [
      ...decorationItems,
      ...interiorItems,
    ].filter((item) => newBackendInventory.includes(item.itemId!));
    set({ combinedInventoryList: newCombinedListFromBackend });
  },
  toggleItemInDisplay: (itemIdToToggle: number) => {
    const currentCombinedList = get().combinedInventoryList;
    const itemIdsInCurrentList = currentCombinedList.map((item) => item.itemId);

    let newCombinedList;

    if (itemIdsInCurrentList.includes(itemIdToToggle)) {
      // 아이템이 이미 리스트에 있으면 제거 (착용 해제)
      newCombinedList = currentCombinedList.filter(
        (item) => item.itemId !== itemIdToToggle
      );
    } else {
      // 아이템이 리스트에 없으면 추가 (착용)
      const itemObjectToAdd = [...decorationItems, ...interiorItems].find(
        (item) => item.itemId === itemIdToToggle
      );

      if (itemObjectToAdd) {
        newCombinedList = [...currentCombinedList, itemObjectToAdd];
      } else {
        // decorationItems나 interiorItems에 해당 itemId를 가진 아이템이 없는 경우
        console.warn(
          `_updateCombinedInventoryList: Item with itemId ${itemIdToToggle} not found in master lists.`
        );
        newCombinedList = currentCombinedList; // 변경 없음
      }
    }
    set({ combinedInventoryList: newCombinedList });
  },
}));
