"use client";

import { useWearingInventory } from "@/hooks/useInventory";
import { catStore } from "@/store/catStore";
import { ItemType } from "@/types/itemTypes";
import Image from "next/image";
import React, { useEffect } from "react";



const Cat = () => {
  const inventoryList = catStore((state) => state.combinedInventoryList);
  const setInventory = catStore((state) => state.setInventory); // 독립적인 setInventory 액션 가져오기
  const currentStoreInventory = catStore((state) => state.inventory); // 현재 스토어의 독립적인 inventory 상태

  const {
    data: InventoryData,
    isPending: isInventoryPending,
    isError: inventoryError,
  } = useWearingInventory();

  useEffect(() => {
    if (
      !isInventoryPending &&
      Array.isArray(InventoryData) && // InventoryData가 배열인지 확인
      !inventoryError &&
      // 현재 스토어의 인벤토리와 API에서 가져온 인벤토리가 다를 때만 업데이트
      (InventoryData.length !== currentStoreInventory.length ||
        !InventoryData.every((item) => currentStoreInventory.includes(item)))
    ) {
      setInventory(InventoryData); // catStore의 독립적인 inventory 상태를 업데이트
    }
  }, [
    InventoryData,
    isInventoryPending,
    inventoryError,
    setInventory,
    currentStoreInventory,
    inventoryList,
  ]);

  return (
    <div className="relative w-[180px] h-[180px]">
      <Image
        src="/assets/images/cat.svg"
        alt="고양이"
        width={180}
        height={180}
        className="relative z-10"
      />

      {inventoryList &&
        inventoryList.map((item: ItemType) => (
          <Image
            key={item.itemId}
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className={item.className}
          />
        ))}
    </div>
  );
};

export default Cat;
