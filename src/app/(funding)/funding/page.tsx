"use client";

import FilterButtons from "@/components/funding/FilterButton";
import CampaignCard from "@/components/funding/CampaignCard";
import NavigateToWriteButton from "@/components/funding/NavigateToWriteButton";
import { useState, useCallback } from "react";
import { FundingData } from "@/lib/api/funding";
import { useFundingList, useFundingRecommendList } from "@/hooks/useFunding";
import { userStore } from "@/store/userStore";

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
    <div className="flex min-h-screen flex-col px-8 py-8 relative">
      <div className="flex w-full justify-between">
        <div>
          <FilterButtons
            onSortConditionChange={handleSortConditionChange}
            currentSortCondition={sortCondition}
          />
        </div>
        <div className="absolute top-[2.8vh] right-8">
          {triggerRegistration && <NavigateToWriteButton />}
        </div>
      </div>

      <div className="relative top-[6vh] mt-[10px] grid grid-cols-2 gap-5 max-h-[78vh] overflow-y-scroll scrollbar-none">
        {!campaigns || campaigns.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500">
            표시할 캠페인이 없습니다.
          </div>
        ) : (
          campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))
        )}
      </div>
    </div>
  );
}
