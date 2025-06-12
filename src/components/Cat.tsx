"use client";

import { useWearingInventory } from "@/hooks/useInventory";
import { catStore } from "@/store/catStore";
import { ItemType } from "@/types/itemTypes"; // ItemType 사용
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react"; // useRef 추가

// Cat 컴포넌트의 props 타입을 정의합니다. level은 number이거나 undefined일 수 있습니다.
type CatProps = {
  level: number | undefined;
};

// Cat 컴포넌트는 level prop을 받습니다.
const Cat = ({ level }: CatProps) => {
  const inventoryList = catStore((state) => state.combinedInventoryList);
  const setInventory = catStore((state) => state.setInventory);
  const currentStoreInventory = catStore((state) => state.inventory);
  const [isLevelUp, setIsLevelUp] = useState(false);

  // useRef를 사용하여 이전 레벨 값을 저장합니다. 초기값은 null로 설정.
  // 첫 번째 유효한 레벨 값과는 비교하지 않도록 `null`을 사용합니다.
  const prevLevelRef = useRef<number | null>(null);

  const {
    data: InventoryData,
    isPending: isInventoryPending,
    isError: inventoryError,
  } = useWearingInventory();

  // 레벨 업 애니메이션을 제어하는 useEffect
  useEffect(() => {
    // 1. level prop이 유효한 숫자인지 확인합니다.
    if (typeof level === "number") {
      // 2. prevLevelRef.current가 아직 설정되지 않았다면 (컴포넌트 로드 후 처음으로 유효한 레벨 데이터를 받았을 때)
      //    현재 레벨을 저장하고 애니메이션을 트리거하지 않습니다.
      if (prevLevelRef.current === null) {
        prevLevelRef.current = level;
        return; // 첫 데이터 로드에서는 여기서 종료
      }

      // 3. prevLevelRef.current가 유효한 값을 가지고 있고, 현재 레벨이 이전 레벨과 다를 때만
      //    (즉, 첫 마운트 이후 레벨이 실제로 변경되었을 때)
      if (level !== prevLevelRef.current) {
        // 4. 레벨이 증가했을 때만 애니메이션을 트리거합니다.
        if (level > prevLevelRef.current) {
          setIsLevelUp(true);
          const timeout = setTimeout(() => setIsLevelUp(false), 3000); // 3초 후 애니메이션 종료
          return () => clearTimeout(timeout); // 클린업 함수
        }
      }
      // 5. 현재 레벨을 prevLevelRef에 저장하여 다음 렌더링에서 비교합니다.
      //    (레벨이 변경되었든 아니든, 유효한 레벨이라면 항상 업데이트)
      prevLevelRef.current = level;
    }
  }, [level]); // level prop이 변경될 때마다 이 훅 실행

  // 인벤토리 데이터를 동기화하는 useEffect (기존 로직 유지)
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
      {isLevelUp && (
        <div className="absolute w-[200px] h-[200px] -translate-x-[6px] -translate-y-[10px] rounded-full bg-amber-100 opacity-50 animate-levelUpGlow z-50" />
      )}
      <Image
        src="/assets/images/cat.svg"
        alt="고양이"
        width={180}
        height={180}
        className="relative z-70"
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
      {isLevelUp && (
        <div className="absolute left-1/2 top-0 transform -translate-x-1/3 -translate-y-[70px] text-yellow-400 font-bold text-2xl animate-bounce z-60">
          LEVEL UP!
        </div>
      )}
    </div>
  );
};

export default Cat;
