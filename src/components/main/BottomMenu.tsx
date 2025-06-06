"use client";

import React, { useEffect, useState } from "react";
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

 const combineInventoryAndItem = (
  // api data 와 정적데이터를 합쳐서 한 배열을 만듬
  inventoryResponses: InventoryResponse[],
  itemTypes: InteractionMenuProps[]
): CombinedInteractiveItem[] => {
  const combinedItems: CombinedInteractiveItem[] = [];
  const itemTypeMap = new Map<number, InteractionMenuProps>();
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

const BottomMenu = () => {
  const { feed, play, touch, setInteraction } = InteractionStore(
    (state) => state
  );

  const [interactionState, setInteractionState] = useState<
    CombinedInteractiveItem[]
  >([]);

  const {
    data: interactionData, // itemId 배열 (예: [9])
    isPending: isInteractionPending,
    isError: interactionError,
  } = useInteractionSearchQuery();

  const { mutate: usinginteractiveItemMutate } = useInteractiveMutation();

  useEffect(() => {
    if (interactionData) {
      const finalInventoryList = combineInventoryAndItem(
        interactionData,
        InteractionMenu
      );
      setInteractionState(finalInventoryList);
      setInteraction(finalInventoryList);
    }
  }, [interactionData, isInteractionPending, interactionError]);

  const handleInterativeItemUsing = (id: number) => {
    const newList = interactionState.map((item) => {
      if (id === item.id) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });
    setInteractionState(newList);
    setInteraction(newList);
    console.log("api에 같이 보내는 id", id);
    usinginteractiveItemMutate(id);
  };
  return (
    <div className="fixed bottom-30 w-full flex py-4 px-8 sm:p-13 md:py-15 md:px-22 justify-between">
      {interactionState.map((item) => (
        <Button
          variant="soft"
          size="lg"
          className="flex flex-col px-4 py-3 gap-2"
          onClick={() => handleInterativeItemUsing(item.id)}
          key={item.id}>
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
          />
          <div className={`flex flex-col ${item.id === 2 ? "pt-1.5" : "pt-0"}`}>
            <span className="font-semibold text-xs text-secondary">
              {item.label}
            </span>

            <span className="font-semibold text-xs text-accent">
              {item.id === interactionState[0].id
                ? feed?.quantity || interactionState[0].quantity
                : item.id === interactionState[1].id
                ? play?.quantity || interactionState[1].quantity
                : touch?.quantity || interactionState[2].quantity}
              개
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default BottomMenu;
