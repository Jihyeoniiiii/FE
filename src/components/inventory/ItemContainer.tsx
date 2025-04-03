import React from "react";
import { decorationItems, interiorItems } from "@/lib/inventoryItems";
import ItemBoxButton from "./ItemBoxButton";
import Image from "next/image";

const ItemContainer = () => {
  return (
    <div className="flex flex-col w-full h-105 p-8 bg-white rounded-2xl gap-4">
      <div className="flex flex-col">
        <span className="text-secondary font-semibold text-lg">장식</span>
        <div className="flex py-3 gap-4 overflow-hidden overflow-x-auto touch-manipulation">
          {decorationItems.map((item) => {
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
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-secondary font-semibold text-lg">인테리어</span>
        <div className="flex py-3 gap-4 overflow-hidden overflow-x-auto touch-manipulation">
          {interiorItems.map((item) => {
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
          })}
        </div>
      </div>
    </div>
  );
};

export default ItemContainer;
