"use client";

import React, { useState } from "react";
import Image from "next/image";

const NavigationBar = () => {
  const [isActiveMenu, setIsActiveMenu] = useState<number>(0);

  const navItems = [
    { id: 1, src: "/assets/icons/funding.svg", alt: "Funding", label: "펀딩", width: 24, height: 25 },
    { id: 2, src: "/assets/icons/review.svg", alt: "Review", label: "후기", width: 25, height: 25 },
    { id: 3, src: "/assets/icons/friend.svg", alt: "Friend", label: "친구", width: 23, height: 23 },
    { id: 4, src: "/assets/icons/profile.svg", alt: "Profile", label: "내 계정", width: 25, height: 25 },
  ];

  const handleMenuClick = (id: number) => {
    setIsActiveMenu(id);
  };

  return (
    <div className="w-full h-[4rem] fixed bottom-0 bg-white">
      <div
        className="absolute top-[5px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full flex items-center justify-center cursor-pointer bg-primary"
        onClick={() => handleMenuClick(0)}
      >
        <Image src="/assets/icons/home.svg" alt="Home" width={25} height={26} />
      </div>
      <div className="flex w-full">
        <div className="flex w-[45%] pl-8 pt-2.5 justify-between">
        {navItems.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="flex gap-0.5 items-center justify-center cursor-pointer"
              onClick={() => handleMenuClick(item.id)}
            >
              <div
                className={`flex flex-col items-center justify-center relative ${
                  isActiveMenu === item.id ? "opacity-30" : "opacity-100"
                }`}
              >
                <Image src={item.src} alt={item.alt} width={item.width} height={item.height} />
                <span className="font-semibold text-xs text-primary">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-end">
          <div className="flex w-1/2 pr-8 pt-2.5 justify-between">
          {navItems.slice(2, 4).map((item) => (
              <div
                key={item.id}
                className="flex gap-0.5 items-center justify-center cursor-pointer"
                onClick={() => handleMenuClick(item.id)}
              >
                <div
                  className={`flex flex-col items-center justify-center relative ${
                    isActiveMenu === item.id ? "opacity-30" : "opacity-100"
                  }`}
                >
                  <Image src={item.src} alt={item.alt} width={item.width} height={item.height} />
                  <span className="font-semibold text-xs text-primary">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
