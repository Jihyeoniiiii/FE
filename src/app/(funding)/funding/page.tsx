import React from "react";
import FilterButtons from "@/components/funding/filterButtons";
import CampaignCard from "@/components/funding/campaignCard";
import { transformedCampaigns } from "@/utils/fundingPage";
import { Button } from "@/components/ui/button";

export default function FundingListPage() {
  return (
    <div className="flex min-h-screen flex-col px-8 py-17">
      {/* Filter dropdown */}
      <FilterButtons />

      {/* Projects grid */}
      <div className="relative top-[6vh] mt-[10px] grid grid-cols-2 gap-3 max-h-[80vh] overflow-y-auto scrollbar-none">
        {" "}
        {transformedCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
      <Button className="relative left-73 top-[87%] absolute text-white text-base font-semibold rounded-2xl">
        {" "}
        등록하기
      </Button>
    </div>
  );
}
