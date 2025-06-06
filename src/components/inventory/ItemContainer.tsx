"use client";

import { decorationItems, interiorItems } from "@/lib/inventoryItems";
import ItemBoxButton from "./ItemBoxButton";
import Image from "next/image";
import {
  useDecorationSearch,
  useInteriorSearch,
  useToggleInventory,
} from "@/hooks/useInventory";
import { catStore } from "@/store/catStore";
import { useEffect, useState } from "react";
import {
  CombinedInventoryItem,
  InventoryResponse,
  ItemType,
} from "@/types/itemTypes";

const SkeletonBox = () => (
  <div className="bg-gray-200 shadow-xs flex justify-center w-25 h-25 rounded-2xl">
    <span className="flex text-center items-center text-gray-400 font-bold">
      Comming <br /> Soon
    </span>
  </div>
);

const combineInventoryAndItem = ( // api data 와 정적데이터를 합쳐서 한 배열을 만듬
  inventoryResponses: InventoryResponse[],
  itemTypes: ItemType[]
): CombinedInventoryItem[] => {
  const combinedItems: CombinedInventoryItem[] = [];
  const itemTypeMap = new Map<number, ItemType>();
  itemTypes.forEach((item) => {
    if (item.itemId !== undefined) {
      itemTypeMap.set(item.itemId, item);
    }
  });

  inventoryResponses.forEach((inventoryItem) => {
    const matchingItemType = itemTypeMap.get(inventoryItem.itemId);
    if (matchingItemType) {
      combinedItems.push({
        ...inventoryItem,
        ...matchingItemType,
      });
    }
  });
  return combinedItems;
};

const ItemContainer = () => {
  const [ownedInventory, setOwnedInventory] = useState<CombinedInventoryItem[]>(
    []
  );
  const toggleItemInDisplay = catStore((state) => state.toggleItemInDisplay); // 인벤토리 토글 상태
  const setAcquiredItem = catStore((state) => state.setAcquiredItem);
  const allInventoryItems = [...decorationItems, ...interiorItems];

  const {
    data: decorationId,
    isPending: isDecorationPending,
    isError: isDecorationError,
  } = useDecorationSearch(); // 장식 아이템 조회

  const {
    data: interiorId,
    isPending: isInteriorPending,
    isError: isInteriorError,
  } = useInteriorSearch(); // 인테리어 아이템 조회

  const { mutate: toggleInventoryMutate } = useToggleInventory(); // 인벤토리 아이템 토글

  const handleToggleInventory = (uiId: number) => {
    const itemToToggle = ownedInventory.find((item) => item.itemId === uiId);
    console.log("itemToToggle:", itemToToggle);
    if (!itemToToggle || itemToToggle.itemId === undefined) {
      console.warn("Could not find item or itemId for UI ID:", uiId);
      return; // itemId가 없으면 처리하지 않음
    }

    const id = itemToToggle.id; // 찾은 itemId
    console.log("toggleID:", id);
    toggleItemInDisplay(uiId);
    toggleInventoryMutate(id);
  };

  useEffect(() => {
    if (
      Array.isArray(decorationId) &&
      Array.isArray(interiorId) &&
      !isInteriorError &&
      !isDecorationPending &&
      !isDecorationError &&
      !isInteriorPending
    ) {
      const tempRepo = [...decorationId, ...interiorId];
      const finalInventoryList = combineInventoryAndItem(
        tempRepo,
        allInventoryItems
      );
      setOwnedInventory(finalInventoryList);
      setAcquiredItem(finalInventoryList);

      console.log("ownedInventory:", ownedInventory);
    }
  }, [
    decorationId,
    interiorId,
    isDecorationPending,
    isDecorationError,
    isInteriorPending,
    isInteriorError,
    setAcquiredItem,
  ]);

  if (isDecorationPending || isInteriorPending) {
    return (
      <div className="flex flex-col fixed bottom-[3rem] w-full h-110 p-8 bg-white rounded-2xl gap-4">
        {["장식", "인테리어"].map((label) => (
          <div key={label} className="flex flex-col">
            <span className="text-secondary font-semibold text-lg">
              {label}
            </span>
            <div className="flex py-3 gap-4">
              <SkeletonBox />
              <SkeletonBox />
              <SkeletonBox />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isDecorationPending || isInteriorPending) {
    return (
      <div className="flex flex-col fixed bottom-[3rem] w-full h-110 p-8 bg-white rounded-2xl gap-4">
        {["장식", "인테리어"].map((label) => (
          <div key={label} className="flex flex-col">
            <span className="text-secondary font-semibold text-lg">
              {label}
            </span>
            <div className="flex py-3 gap-4">
              <SkeletonBox />
              <SkeletonBox />
              <SkeletonBox />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isDecorationError || isInteriorError) {
    return (
      <div className="p-8 text-center text-red-500">
        아이템을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </div>
    );
  }
  const isItemCurrentlyOwned = (itemId: number) => // 매개 변수로 들어오는 itemId가 내가 가지고 있는 인벤토리에 있는 지 체크
    ownedInventory.some((item) => item.itemId === itemId);

  const renderItemsByCategory = (categoryItems: ItemType[]) => { // isItemCurrentlyOwned로 체크해서 있었으면 정적데이터에서 가져와서 UI 출력
    return categoryItems.map((item) => (
      <div
        key={item.itemId}
        onClick={() => handleToggleInventory(item.itemId!)}
        className="cursor-pointer">
        <ItemBoxButton>
          {isItemCurrentlyOwned(item.itemId!) ? (
            <Image src={item.src} alt={item.alt} width={55} height={55} />
          ) : (
            <SkeletonBox />
          )}
        </ItemBoxButton>
      </div>
    ));
  };

  return (
    <div className="flex flex-col fixed bottom-[3rem] w-full h-110 p-8 bg-white rounded-2xl gap-4">
      <div className="flex flex-col">
        <span className="text-secondary font-semibold text-lg">장식</span>
        <div className="flex py-3 gap-4 overflow-x-auto touch-manipulation scrollbar-none">
          {renderItemsByCategory(decorationItems)}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-secondary font-semibold text-lg">인테리어</span>
        <div className="flex py-3 gap-4 overflow-x-auto touch-manipulation scrollbar-none">
          {renderItemsByCategory(interiorItems)}
        </div>
      </div>
    </div>
  );
};

export default ItemContainer;
