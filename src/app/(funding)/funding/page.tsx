"use client";

import FilterButtons from "@/components/funding/FilterButton";
import CampaignCard from "@/components/funding/CampaignCard";
import NavigateToWriteButton from "@/components/funding/NavigateToWriteButton";
import { useState, useCallback } from "react";
import { FundingData } from "@/lib/api/funding";
import { useFundingList, useFundingRecommendList } from "@/hooks/useFunding";
import { userStore } from "@/store/userStore";
import { chunk } from "lodash";

export default function FundingListPage() {
  const triggerRegistration = userStore((state) => state.recipientData);
  const [statusFilter, setStatusFilter] = useState<
    "ONGOING" | "COMPLETED" | "FAILED" | undefined
  >(undefined);
  const [sortCondition, setSortCondition] = useState<"최신순" | "추천순">(
    "최신순"
  );

  const handleSortConditionChange = useCallback(
    (newCondition: "최신순" | "추천순") => {
      setSortCondition(newCondition);
      setStatusFilter(undefined);
    },
    []
  );

  const {
    data: fundingListData,
    isPending: isFundingListPending,
    isError: isFundingListError,
  } = useFundingList({ status: statusFilter, limit: 8 });

  const {
    data: fundingRecommendData,
    isPending: isFundingRecommendPending,
    isError: isFundingRecommendError,
  } = useFundingRecommendList({ limit: 8 });

  const currentFundingData =
    sortCondition === "추천순" ? fundingRecommendData : fundingListData;
  const areCampaignsPending =
    sortCondition === "추천순"
      ? isFundingRecommendPending
      : isFundingListPending;
  const areCampaignsError =
    sortCondition === "추천순" ? isFundingRecommendError : isFundingListError;

  const campaigns: FundingData[] | undefined = currentFundingData?.data?.values;

  if (areCampaignsPending) {
    return <div>캠페인을 불러오는 중...</div>;
  }

  if (areCampaignsError) {
    return <div>캠페인을 불러오는데 오류가 발생했습니다.</div>;
  }

  return (
    <div className="flex min-h-[100dvh] flex-col px-6 pb-10 relative">
      <div className="flex w-full justify-between top-5 mt-7">
        <FilterButtons
          onSortConditionChange={handleSortConditionChange}
          currentSortCondition={sortCondition}
        />

        {triggerRegistration && <NavigateToWriteButton />}
      </div>

      <div
        style={{ height: "calc(100dvh - 9rem)" }}
        className="relative top-[3vh]  overflow-y-auto scrollbar-none flex flex-col gap-4">
        {!campaigns || campaigns.length === 0 ? (
          <div className="text-center text-gray-500">
            표시할 캠페인이 없습니다.
          </div>
        ) : (
          chunk(campaigns, 2).map((pair: FundingData[], idx: number) => (
            <div key={idx} className="grid grid-cols-2 gap-2">
              {pair.map((campaign) => (
                <div
                  key={campaign.id}
                  className="border-2 border-white-50 rounded-lg py-2 px-4 bg-white-50">
                  <CampaignCard campaign={campaign} />
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
