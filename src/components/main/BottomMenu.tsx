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
// import confetti from "@assets/images/itemBomb.png"; // 이 줄은 사용되지 않으므로 제거합니다.

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
  // 애니메이션 활성화 상태 (전체 애니메이션 표시 여부)
  const [animationState, setAnimationState] = useState<boolean>(false);
  // 축소 애니메이션 상태 (ConfettiShrink 애니메이션 적용 여부)
  const [shrinking, setShrinking] = useState<boolean>(false);

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

  useEffect(() => {
    let shrinkDelayTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    if (animationState) {
      // 컨페티가 나타난 후, 0.5초 동안 대기하다가 축소 애니메이션 시작
      setShrinking(false);

      shrinkDelayTimer = setTimeout(() => {
        setShrinking(true); // 0.5초 후 confettiShrink 애니메이션 트리거
      }, 500); // 0.5초 대기

      // 총 1초 후 (0.5초 대기 + confettiShrink 애니메이션 0.5초) 컨페티 숨김
      hideTimer = setTimeout(() => {
        setAnimationState(false); // 전체 애니메이션 숨기기
        setShrinking(false); // 축소 상태 리셋
      }, 1000); // 총 1초 후

      return () => {
        clearTimeout(shrinkDelayTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [animationState]);

  const handleInterativeItemUsing = useCallback(
    (clickedItemId: number) => {
      if (animationState) return;

      // 애니메이션 시작 상태로 설정
      setAnimationState(true);

      let currentItemState;
      let setSpecificItem;

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
        console.log("해당 아이템이 없습니다. 기부하고 보상으로 받아보세요!"); // alert() 대체
        return;
      }

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

      // API 호출 (유효한 아이템 ID가 있을 경우)
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
      animationState,
    ]
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
      {/* 하단 메뉴 아이템 렌더링 */}
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
      {/* 컨페티 애니메이션 */}
      {animationState && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div
            className={`relative w-full h-full max-w-[390px] -translate-x-12 -translate-y-[-40%] ${
              shrinking ? "animate-confettiShrink" : ""
            }`}
            style={{
              transformOrigin: "center center",
            }}>
            <Image
              height={300}
              width={300}
              src="/assets/images/congratulations.gif"
              alt="축하 컨페티"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomMenu;
