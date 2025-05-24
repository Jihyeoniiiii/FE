"use client";

import { decorationItems, interiorItems } from "@/lib/inventoryItems";
import ItemBoxButton from "./ItemBoxButton";
import Image from "next/image";
import {
  useDecorationSearch,
  useInteriorSearch,
  usetoggleInventory,
} from "@/hooks/useInventory";

const SkeletonBox = () => (
  <div className="bg-gray-200 shadow-xs flex justify-center w-25 h-25 rounded-2xl" />
);

const ItemContainer = () => {
  const {
    data: decorationId,
    isPending: isDecorationPending,
    isError: isDecorationError,
  } = useDecorationSearch(); // 장식 아이템 조회

  const {
    data: interiorId,
    isPending: isInteriorPending,
    isError: isInteriorError,
  } = useInteriorSearch();  // 인테리어 아이템 조회

  const { mutate: toggleInventory } = usetoggleInventory(); // 인벤토리 아이템 토글

  if (isDecorationPending || isInteriorPending) { // 로딩 처리
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

  if (isDecorationError || isInteriorError) {   // 에러 처리
    return (
      <div className="p-8 text-center text-red-500">
        아이템을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </div>
    );
  }

  const isItemInList = (id: number, list: { itemId: number }[] = []) =>
    list.some((i) => i.itemId === id); // 아이템이 리스트에 있는지 확인

  return (
    <div className="flex flex-col fixed bottom-[3rem] w-full h-110 p-8 bg-white rounded-2xl gap-4">
      <div className="flex flex-col">
        <span className="text-secondary font-semibold text-lg">장식</span>
        <div className="flex py-3 gap-4 overflow-x-auto touch-manipulation">
          {decorationItems.map((item) =>
            isItemInList(item.id, decorationId) ? (
              <div
                key={item.id}
                onClick={() => toggleInventory(item.id)}
                className="cursor-pointer">
                <ItemBoxButton>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                  />
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
                onClick={() => toggleInventory(item.id)}
                className="cursor-pointer">
                <ItemBoxButton>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                  />
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
