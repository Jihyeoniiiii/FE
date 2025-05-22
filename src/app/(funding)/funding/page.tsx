"use client";

import FilterButtons from "@/components/funding/FilterButton";
import CampaignCard from "@/components/funding/CampaignCard";
import NavigateToWriteButton from "@/components/funding/NavigateToWriteButton";
// import { useState } from "react";
import { useFunding } from "@/hooks/useFunding";
import { FundingData } from "@/lib/api/funding";

export default function FundingListPage() {
  // const [statusFilter, setStatusFilter] = useState<"ONGOING" | "COMPLETED" | "FAILED" | undefined>(undefined);
  const { fundingListQuery } = useFunding(undefined, { limit: 8 });
  const { data: FundingByConditionData, isPending, isError } = fundingListQuery;

  const campaigns: FundingData[] | undefined =
    FundingByConditionData?.data?.values;

  if (isPending) return <div>Loading campaigns...</div>;
  if (isError) return <div>Error loading campaigns</div>;

  return (
    <div className="flex min-h-screen flex-col px-8 py-8 relative">
      <div className="flex w-full justify-between">
        <div>
          <FilterButtons />
        </div>
        <div className="absolute top-[2.8vh] right-8">
          <NavigateToWriteButton />
        </div>
      </div>

      {/* Projects grid */}
      <div className="relative top-[6vh] mt-[10px] grid grid-cols-2 gap-5 max-h-[78vh] overflow-y-scroll scrollbar-none">
        {campaigns?.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
