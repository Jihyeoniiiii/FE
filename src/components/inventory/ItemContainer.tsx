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

const SkeletonBox = () => (
  <div className="bg-gray-200 shadow-xs flex justify-center w-25 h-25 rounded-2xl">
    <span className="flex text-center items-center text-gray-400 font-bold">
      Comming <br /> Soon
    </span>
  </div>
);

const ItemContainer = () => {
  const toggleItemInDisplay = catStore((state) => state.toggleItemInDisplay); // 인벤토리 토글 상태
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
    const itemToToggle = allInventoryItems.find((item) => item.id === uiId);

    if (!itemToToggle || itemToToggle.itemId === undefined) {
      console.warn("Could not find item or itemId for UI ID:", uiId);
      return; // itemId가 없으면 처리하지 않음
    }

    const actualItemId = itemToToggle.itemId; // 찾은 itemId
    toggleItemInDisplay(actualItemId);
    toggleInventoryMutate(uiId);
  };

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

  const isItemInList = (uiId: number, list: { id: number }[] = []) =>
    list.some((i) => i.id === uiId);

  return (
    <div className="flex flex-col fixed bottom-[3rem] w-full h-110 p-8 bg-white rounded-2xl gap-4">
      <div className="flex flex-col">
        <span className="text-secondary font-semibold text-lg">장식</span>
        <div className="flex py-3 gap-4 overflow-x-auto touch-manipulation">
          {decorationItems.map((item) =>
            isItemInList(item.id, decorationId) ? (
              <div
                key={item.id}
                onClick={() => handleToggleInventory(item.id)}
                className="cursor-pointer">
                <ItemBoxButton>
                  <Image src={item.src} alt={item.alt} width={55} height={55} />
                </ItemBoxButton>
              </div>
            ) : (
              <SkeletonBox key={item.id} />
            )
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-secondary font-semibold text-lg">인테리어</span>
        <div className="flex py-3 gap-4 overflow-x-auto touch-manipulation">
          {interiorItems.map((item) =>
            isItemInList(item.id, interiorId) ? (
              <div
                key={item.id}
                onClick={() => handleToggleInventory(item.id)}
                className="cursor-pointer">
                <ItemBoxButton>
                  <Image src={item.src} alt={item.alt} width={55} height={55} />
                </ItemBoxButton>
              </div>
            ) : (
              <SkeletonBox key={item.id} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemContainer;
