"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  useInteractionSearchQuery,
  useInteractiveMutation,
} from "@/hooks/useInteraction";
import { InteractionMenu } from "@/lib/InteractionMenu";
import { InteractionStore } from "@/store/interactionStore";
import {
  CombinedInteractiveItem,
  InteractionMenuProps,
  InventoryResponse,
} from "@/types/itemTypes";

// `combineInventoryAndItem` 함수는 컴포넌트 외부에 정의하여 불필요한 재생성을 방지
const combineInventoryAndItem = (
  inventoryResponses: InventoryResponse[],
  itemTypes: InteractionMenuProps[]
): CombinedInteractiveItem[] => {
  const itemTypeMap = new Map<number, InteractionMenuProps>();
  itemTypes.forEach((item) => itemTypeMap.set(item.itemId, item));

  return itemTypes.map((staticItem) => {
    const matchingInventoryItem = inventoryResponses.find(
      (inventoryItem) => inventoryItem.itemId === staticItem.itemId
    );

    return matchingInventoryItem
      ? { ...staticItem, ...matchingInventoryItem }
      : {
          ...staticItem,
          id: 0, // 실제 ID가 없을 경우 기본값
          isWearing: false,
          quantity: 0,
          createdAt: "",
        };
  });
};

const BottomMenu = () => {
  const { feed, play, touch, setFeed, setPlay, setTouch } = InteractionStore(
    (state) => state
  );

  // 초기 상태를 `useMemo`로 한 번만 계산하도록 최적화
  const initialInteractionState = useMemo(() => {
    return InteractionMenu.map((item) => ({
      ...item,
      id: 0,
      isWearing: false,
      quantity: 0,
      createdAt: "",
    }));
  }, []); // 빈 의존성 배열로 최초 렌더링 시에만 실행

  const [interactionState, setInteractionState] = useState<
    CombinedInteractiveItem[]
  >(initialInteractionState);

  const {
    data: interactionData,
    isPending: isInteractionPending,
    isError: interactionError,
  } = useInteractionSearchQuery();

  const { mutate: usinginteractiveItemMutate } = useInteractiveMutation();

  useEffect(() => {
    // 데이터 로딩이 완료되고 오류가 없을 때만 상태 업데이트
    if (
      interactionData &&
      interactionData.length > 0 &&
      !isInteractionPending &&
      !interactionError
    ) {
      const finalInventoryList = combineInventoryAndItem(
        interactionData,
        InteractionMenu
      );

      setInteractionState(finalInventoryList);

      finalInventoryList.forEach((item) => {
        if (item.itemId === 1) setFeed(item);
        else if (item.itemId === 2) setPlay(item);
        else if (item.itemId === 3) setTouch(item);
      });
    }
  }, [
    interactionData,
    isInteractionPending,
    interactionError,
    setFeed,
    setPlay,
    setTouch,
  ]);

  const handleInterativeItemUsing = useCallback(
    (clickedItemId: number) => {
      let currentItemState;
      let setSpecificItem;

      // 클릭된 아이템에 해당하는 Zustand 상태와 setter
      if (clickedItemId === 1) {
        currentItemState = feed;
        setSpecificItem = setFeed;
      } else if (clickedItemId === 2) {
        currentItemState = play;
        setSpecificItem = setPlay;
      } else if (clickedItemId === 3) {
        currentItemState = touch;
        setSpecificItem = setTouch;
      } else {
        console.warn("알 수 없는 아이템 ID:", clickedItemId);
        return;
      }

      if (
        currentItemState?.quantity === undefined ||
        currentItemState.quantity <= 0
      ) {
        alert("해당 아이템이 없습니다. 기부하고 보상으로 받아보세요!");
        return;
      }

      // Zustand 스토어 업데이트
      setSpecificItem({
        ...currentItemState,
        quantity: currentItemState.quantity - 1,
      });

      setInteractionState((prevList) => {
        return prevList.map((item) =>
          item.itemId === clickedItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      });

      if (currentItemState && currentItemState.id !== 0) {
        usinginteractiveItemMutate(currentItemState.id);
        console.log("API에 같이 보내는 ID:", currentItemState.id);
      } else {
        console.warn(
          "뮤테이션을 위한 유효한 아이템 ID를 찾을 수 없습니다:",
          clickedItemId
        );
      }
    },
    [
      feed,
      play,
      touch,
      setFeed,
      setPlay,
      setTouch,
      usinginteractiveItemMutate,
      interactionState,
    ] // interactionState 추가
  );

  // 수량을 동적으로 관리하는 함수
  const getItemQuantity = useCallback(
    (itemId: number) => {
      switch (itemId) {
        case 1:
          return feed?.quantity ?? 0;
        case 2:
          return play?.quantity ?? 0;
        case 3:
          return touch?.quantity ?? 0;
        default:
          const itemInState = interactionState.find(
            (item) => item.itemId === itemId
          );
          return itemInState?.quantity ?? 0;
      }
    },
    [feed?.quantity, play?.quantity, touch?.quantity, interactionState]
  );

  return (
    <div className="fixed bottom-30 w-full flex py-4 px-8 sm:p-13 md:w-[640px] justify-between">
      {interactionState.map((item) => (
        <Button
          variant="soft"
          size="lg"
          className="flex flex-col px-4 py-3 gap-2"
          onClick={() => handleInterativeItemUsing(item.itemId)}
          key={item.itemId}>
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
          />
          <div
            className={`flex flex-col ${
              item.itemId === 2 ? "pt-1.5" : "pt-0"
            }`}>
            <span className="font-semibold text-xs text-secondary">
              {item.label}
            </span>
            <span className="font-semibold text-xs text-accent">
              {getItemQuantity(item.itemId)} 개
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default BottomMenu;
