"use client";

import React, { useState } from "react";
import MyFundItem from "./MyFundItem";
import ListContainer from "../ListContainer";
import { useFundingList } from "@/hooks/useFunding";

const MyFundList = () => {
  const [activeTab, setActiveTab] = useState<"ongoing" | "completed">("ongoing");
  const {
      data: ongoingFundsData,
    isPending: isLoadingOngoing,
    isError: isErrorOngoing,
    } = useFundingList({ status: "ONGOING", limit: 8 });

  const {
    data: completedFundsData,
    isPending: isLoadingCompleted,
    isError: isErrorCompleted,
  }= useFundingList({ status: "COMPLETED", limit: 8 });

  const handleTabClick = (tab: "ongoing" | "completed") => {
    setActiveTab(tab);
  };

  if (isLoadingOngoing || isLoadingCompleted) {
    return (
      <ListContainer>
        <div className="flex justify-center items-center h-40">로딩 중...</div>
      </ListContainer>
    );
  }

  if (isErrorOngoing || isErrorCompleted) {
    return (
      <ListContainer>
        <div className="flex justify-center items-center h-40 text-red-500">
          펀딩 정보를 불러오는데 실패했습니다.
        </div>
      </ListContainer>
    );
  }

  const ongoingCampaigns = ongoingFundsData?.data?.values || [];;
  const completedCampaigns = completedFundsData?.data?.values || [];;

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
              {ongoingCampaigns.length > 0 ? (
                ongoingCampaigns.map((item) => (
                  <MyFundItem key={item.id} type="ongoing" fundingItem={item} />
                ))
              ) : (
                <p className="text-center text-gray-500">진행중인 펀드가 없습니다.</p>
              )}
            </div>
        )}
        {activeTab === "completed" && (
          <div className="flex flex-col gap-5 max-h-[45vh] overflow-y-scroll scrollbar-none">
          {completedCampaigns.length > 0 ? (
            completedCampaigns.slice().reverse().map((item) => (
              <MyFundItem key={item.id} type="completed" fundingItem={item} />
            ))
          ) : (
            <p className="text-center text-gray-500">완료된 펀드가 없습니다.</p>
          )}
        </div>
        )}
      </div>
    </ListContainer>
  );
};

export default MyFundList;
