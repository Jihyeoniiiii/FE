"use client";

import BackButton from "@/components/BackButton";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Aboutpage = () => {
  const [clickedItems, setClickedItems] = useState<number[]>([]);
  const questionList = [
    { question: "채움이란?", answer: "" },
    { question: "기부 방법이 궁금해요", answer: "" },
    { question: "누구에게 기부하나요?", answer: "" },
    { question: "수혜자로 등록하고 싶어요.", answer: "" },
    { question: "기부 영수증을 받고싶어요", answer: "" },
  ];

  const toggleItem = (index: number) => {
    setClickedItems((prev) => {
      if (prev.includes(index)) {
        // 만약 이미 눌린 index라면 []에서 제외하기
        return prev.filter((item) => item !== index);
      } else {
        // []에 해당 index 추가하기
        return [...prev, index];
      }
    });
  };

  const isItemClicked = (index: number) => {
    return clickedItems.includes(index);
  };

  return (
    <div className="text-secondary">
      <BackButton> 서비스 소개</BackButton>


      <div className="flex flex-col mt-20 gap-6">
        {questionList.map((set, index) => {
          return (
            <div className="flex justify-center" key={index}>
              <div className="w-[90%] bg-white rounded-3xl overflow-hidden">
                <div
                  className={`flex justify-between text-xl font-bold opacity-80 p-6 ${
                    isItemClicked(index) ? "items-start" : "items-center"
                  }`}>
                  <div>{set.question}</div>
                  <ChevronDown
                    className={`h-6 w-6 transition-transform cursor-pointer ${
                      isItemClicked(index) ? "transform rotate-180" : ""
                    }`}
                    onClick={() => toggleItem(index)}
                  />
                </div>

                {isItemClicked(index) && (
                  <div className="px-6 pb-6 text-lg opacity-80">
                    {"->"}
                    {set.answer}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Aboutpage;
