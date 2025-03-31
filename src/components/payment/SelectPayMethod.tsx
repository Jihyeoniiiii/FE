"use client";

import Image from "next/image";
import React, { useState } from "react";

const SelectPayMethod = () => {
  const [activePayMethod, setActivePayMethod] = useState<number>(0);

  const handlePayMethodClick = (id: number) => {
    setActivePayMethod(id);
  };

  return (
    <div className="flex flex-col px-10 gap-5">
      <span className="flex text-sm">충전 수단 선택</span>
      <div className="flex w-full justify-between px-3 sm:px-13 md:px-30">
        <div
          className={`flex justify-center items-center w-33 h-11 px-3 gap-0.5 bg-[#FEE500] rounded-3xl cursor-pointer ${
            activePayMethod === 1 ? "opacity-50" : "opacity-100"
          }`}
          onClick={() => handlePayMethodClick(1)}
        >
          <Image
            src={"/assets/images/kakao-logo.png"}
            alt="KakaoPay"
            className="h-6"
            width={24}
            height={24}
          />
          <Image
            src={"/assets/images/kakao-pay-logo.png"}
            alt="KakaoPay"
            className="h-5.5"
            width={105}
            height={20}
          />
        </div>
        <div
          className={`flex justify-center items-center w-33 h-11 bg-white rounded-3xl cursor-pointer ${
            activePayMethod === 2 ? "opacity-50" : "opacity-100"
          }`}
          onClick={() => handlePayMethodClick(2)}
        >
          <Image
            src={"/assets/images/toss-pay.png"}
            alt="TossPay"
            width={115}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectPayMethod;
