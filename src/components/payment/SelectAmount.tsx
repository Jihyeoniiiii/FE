"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

const SelectAmount = () => {
  const [isActiveAmount, setIsActiveAmount] = useState<number>(0);
  const amountItems = [
    { id: 1, label: "1000원" },
    { id: 2, label: "3000원" },
    { id: 3, label: "5000원" },
    { id: 4, label: "10000원" },
    { id: 5, label: "30000원" },
    { id: 6, label: "50000원" },
  ];

  const handleAmountClick = (id: number) => setIsActiveAmount(id);

  return (
    <div className="px-10">
      <span className="text-sm">기부 금액 선택</span>
      {[0, 2, 4].map((start) => (
        <div key={start} className="flex justify-center items-center gap-2">
          {amountItems.slice(start, start + 2).map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center justify-center relative ${
                isActiveAmount === item.id ? "opacity-50" : "opacity-100"
              }`}
            >
              <Button
                variant="soft"
                className="w-38 sm:w-49 md:w-70 py-5 my-1.5"
                onClick={() => handleAmountClick(item.id)}
              >
                {item.label}
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SelectAmount;
