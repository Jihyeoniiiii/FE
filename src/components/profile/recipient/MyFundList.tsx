"use client";

import React, { useState, useEffect } from "react";
import MyFundItem from "./MyFundItem";
import ListContainer from "../ListContainer";
import { useFundingList } from "@/hooks/useFunding";
import { FundingData } from "@/lib/api/funding";

const MyFundList = () => {
  const [activeTab, setActiveTab] = useState<"ongoing" | "completed">(
    "ongoing"
  );
  const [userFundingIds, setUserFundingIds] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("chaeum-user-storage");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed?.state?.recipientData?.fundings)) {
          const fundings = parsed.state.recipientData.fundings as FundingData[];
          setUserFundingIds(fundings.map((f) => f.id));
        }
      }
    }
  }, []);

  const {
    data: ongoingFundsData,
    isPending: isLoadingOngoing,
    isError: isErrorOngoing,
  } = useFundingList({ status: "ONGOING", limit: 8 });

  const {
    data: completedFundsData,
    isPending: isLoadingCompleted,
    isError: isErrorCompleted,
  } = useFundingList({ status: "COMPLETED", limit: 8 });

  if (isLoadingOngoing || isLoadingCompleted) {
    return (
      <ListContainer type="profile">
        <div className="flex justify-center items-center h-40">로딩 중...</div>
      </ListContainer>
    );
  }

  if (isErrorOngoing || isErrorCompleted) {
    return (
      <ListContainer type="profile">
        <div className="flex justify-center items-center h-40 text-red-500">
          펀딩 정보를 불러오는데 실패했습니다.
        </div>
      </ListContainer>
    );
  }

  const allOngoing = ongoingFundsData?.data?.values || [];
  const allCompleted = completedFundsData?.data?.values || [];

  const userOngoing = allOngoing.filter((item) =>
    userFundingIds.includes(item.id)
  );
  const userCompleted = allCompleted.filter((item) =>
    userFundingIds.includes(item.id)
  );

  return (
    <ListContainer type="profile">
      <div className="flex justify-around border-b border-gray-300">
        <button
          className={`py-2 px-4 focus:outline-none ${
            activeTab === "ongoing"
              ? "text-secondary border-b-2 border-secondary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("ongoing")}
        >
          진행중인 펀드
        </button>
        <button
          className={`py-2 px-4 focus:outline-none ${
            activeTab === "completed"
              ? "text-secondary border-b-2 border-secondary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          완료된 펀드
        </button>
      </div>

      <div className="mt-8">
        {activeTab === "ongoing" && (
          <div className="flex flex-col gap-5 max-h-[45vh] overflow-y-scroll scrollbar-none">
            {userOngoing.length > 0 ? (
              userOngoing.map((item) => (
                <MyFundItem key={item.id} type="ongoing" fundingItem={item} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                진행중인 펀드가 없습니다.
              </p>
            )}
          </div>
        )}
        {activeTab === "completed" && (
          <div className="flex flex-col gap-5 max-h-[45vh] overflow-y-scroll scrollbar-none">
            {userCompleted.length > 0 ? (
              userCompleted
                .slice()
                .reverse()
                .map((item) => (
                  <MyFundItem
                    key={item.id}
                    type="completed"
                    fundingItem={item}
                  />
                ))
            ) : (
              <p className="text-center text-gray-500">
                완료된 펀드가 없습니다.
              </p>
            )}
          </div>
        )}
      </div>
    </ListContainer>
  );
};

export default MyFundList;
