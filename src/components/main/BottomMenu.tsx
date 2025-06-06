"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useInteractionSearch } from "@/hooks/useInteraction";
import { InteractionMenu } from "@/lib/InteractionMenu";
import { InteractionStore } from "@/store/interactionStore";

const BottomMenu = () => {
  const { feed, play, touch, setInteraction } = InteractionStore(
    (state) => state
  );
  const [interactionState, setInteractionState] = useState<number[]>([]);
  const {
    data: InteractionData, // itemId 배열 (예: [9])
    isPending: isInteractionPending,
    isError: InteractionError,
  } = useInteractionSearch();
  useEffect(() => {
    if (InteractionData) {
      const quantityOfInteraction = InteractionData!.map(
        (item) => item.quantity
      );
      setInteractionState(quantityOfInteraction);
      setInteraction(quantityOfInteraction);
    }
  }, [InteractionData, isInteractionPending, InteractionError]);
  return (
    <div className="fixed bottom-30 w-full flex py-4 px-8 sm:p-13 md:py-15 md:px-22 justify-between">
      {InteractionMenu.map((item) => (
        <Button
          variant="soft"
          size="lg"
          className="flex flex-col px-4 py-3 gap-2"
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
              {item.id === 1
                ? feed || interactionState[0]
                : item.id === 2
                ? play || interactionState[1]
                : touch || interactionState[2]}
              개
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default BottomMenu;
