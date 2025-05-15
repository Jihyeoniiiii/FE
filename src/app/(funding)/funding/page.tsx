"use client";

import FilterButtons from "@/components/funding/FilterButton";
import CampaignCard from "@/components/funding/CampaignCard";
import NavigateToWriteButton from "@/components/funding/NavigateToWriteButton";
// import { useState } from "react";
import { useFunding } from "@/hooks/useFunding";
import { FundingData } from "@/lib/api/funding";

export default function FundingListPage() {
  // const [statusFilter, setStatusFilter] = useState<"ONGOING" | "COMPLETED" | "FAILED" | undefined>(undefined);
  const { fundingListQuery } = useFunding(
    undefined,
    { limit: 3 }
  );
  const { data: FundingByConditionData, isLoading, isError } = fundingListQuery;

  const campaigns: FundingData[] | undefined = FundingByConditionData?.data?.values;

  if (isLoading) return <div>Loading campaigns...</div>;
  if (isError) return <div>Error loading campaigns</div>;

  return (
    <div className="flex min-h-screen flex-col px-8 py-8 relative">
      {/* Filter dropdown */}
      <FilterButtons />

      {/* Projects grid */}
      <div className="relative top-[6vh] mt-[10px] grid grid-cols-2 gap-3 max-h-[66vh] overflow-y-scroll scrollbar-none">
        {campaigns?.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      {/* Floating Button */}
      <div className="flex justify-end mt-17">
        <NavigateToWriteButton />
      </div>
    </div>
  );
}