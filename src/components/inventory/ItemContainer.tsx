"use client";

import { decorationItems, interiorItems } from "@/lib/inventoryItems";
import ItemBoxButton from "./ItemBoxButton";
import Image from "next/image";
import { useDecorationSearch, useInteriorSearch } from "@/hooks/useInventory";

const ItemContainer = () => {
  const { data: decorationId, isPending: isDecorationPending } =
    useDecorationSearch();

  const { data: interiorId, isPending: isInteriorPending } =
    useInteriorSearch();

  if (isDecorationPending || isInteriorPending) {
    // 로딩 상태 일때 회색 박스 3개 출력
    return (
      <div className="flex flex-col fixed bottom-[3rem] w-full h-110 p-8 bg-white rounded-2xl gap-4">
        <div className="flex flex-col">
          <span className="text-secondary font-semibold text-lg">장식</span>
          <div className="flex py-10 gap-4 text-xl text-gray-400">로딩중</div>
        </div>
        <div className="flex flex-col">
          <span className="text-secondary font-semibold text-lg">인테리어</span>
          <div className="flex py-10 gap-4 text-xl text-gray-400">로딩중</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col fixed bottom-[3rem] w-full h-110 p-8 bg-white rounded-2xl gap-4">
      <div className="flex flex-col">
        <span className="text-secondary font-semibold text-lg">장식</span>
        <div className="flex py-3 gap-4 overflow-hidden overflow-x-auto touch-manipulation">
          {decorationItems.map((item) => {
            if (!decorationId || decorationId.length === 0) {
              // decorationId가 없을때 회색 박스 3개 출력
              return (
                <div key={item.id}>
                  <div className="bg-gray-200 shadow-xs flex justify-center w-25 h-25 rounded-2xl "></div>
                </div>
              );
            } else {
              // decorationId가 있을때 프론트에서 만들어놓은 decorationItems와 비교
              // decorationId의 itemId와 decorationItems의 id가 같을때 아이템 박스 출력
              for (const i of decorationId) {
                if (i.itemId === item.id) {
                  return (
                    <div key={item.id}>
                      <ItemBoxButton>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                        />
                      </ItemBoxButton>
                    </div>
                  );
                }
              }
            }
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-secondary font-semibold text-lg">인테리어</span>
        <div className="flex py-3 gap-4 overflow-hidden overflow-x-auto touch-manipulation">
          {interiorItems.map((item) => {
            if (!interiorId || interiorId.length === 0) {
              // interiorId가 없을때 회색 박스 3개 출력
              return (
                <div key={item.id}>
                  <div className="bg-gray-200 shadow-xs flex justify-center w-25 h-25 rounded-2xl "></div>
                </div>
              );
            } else {
              for (const i of interiorId) {
                // interiorId가 있을때 프론트에서 만들어놓은 interiorItems와 비교
                // interiorId의 itemId와 interiorItems의 id가 같을때 아이템 박스 출력
                if (i.itemId === item.id) {
                  return (
                    <div key={item.id}>
                      <ItemBoxButton>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                        />
                      </ItemBoxButton>
                    </div>
                  );
                }
              }
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ItemContainer;
