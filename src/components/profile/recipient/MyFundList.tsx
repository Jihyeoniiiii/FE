"use client";

import React, { useState } from "react";
import MyFundItem from "./MyFundItem";
import { reviewData } from "@/lib/reviewData";
import ListContainer from "../ListContainer";

const MyFundList = () => {
  const [activeTab, setActiveTab] = useState("ongoing");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <ListContainer>
      <div className="flex justify-around border-b border-gray-300">
        <button
          className={`py-2 px-4 focus:outline-none ${
            activeTab === "ongoing"
              ? "text-secondary border-b-2 border-secondary"
              : "text-gray-500"
          }`}
          onClick={() => handleTabClick("ongoing")}
        >
          진행중인 펀드
        </button>
        <button
          className={`py-2 px-4 focus:outline-none ${
            activeTab === "completed"
              ? "text-secondary border-b-2 border-secondary"
              : "text-gray-500"
          }`}
          onClick={() => handleTabClick("completed")}
        >
          완료된 펀드
        </button>
      </div>

      <div className="mt-8">
        {activeTab === "ongoing" && (
            <div className="flex flex-col gap-5 max-h-[45vh] overflow-y-scroll scrollbar-none">
              {reviewData.map((item) => (
                <MyFundItem key={item.id} type="ongoing" reviewItem={item} />
              ))}
            </div>
        )}
        {activeTab === "completed" && (
          <div className="flex flex-col gap-5 max-h-[45vh] overflow-y-scroll scrollbar-none">
          {reviewData.slice().reverse().map((item) => (
            <MyFundItem key={item.id} type="completed" reviewItem={item} />
          ))}
        </div>
        )}
      </div>
    </ListContainer>
  );
};

export default MyFundList;
