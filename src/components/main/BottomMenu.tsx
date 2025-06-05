import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const BottomMenu = () => {
  const menuItems = [
    {
      id: 1,
      src: "/assets/icons/feed.svg",
      alt: "Feed",
      label: "사료주기",
      width: 50,
      height: 45,
    },
    {
      id: 2,
      src: "/assets/icons/play.svg",
      alt: "Play",
      label: "놀아주기",
      width: 44,
      height: 45,
    },
    {
      id: 3,
      src: "/assets/icons/stroke.svg",
      alt: "Stroke",
      label: "쓰다듬기",
      width: 50,
      height: 45,
    },
  ];

  return (
    <div className="fixed bottom-30 w-full flex py-4 px-8 sm:p-13 md:py-15 md:px-22 justify-between">
      {menuItems.map((item) => (
        <Button
          variant="soft"
          size="lg"
          className="flex flex-col px-4 py-3 gap-2"
          key={item.id}
        >
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

            <span className="font-semibold text-xs text-accent">0/3</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default BottomMenu;
