import FilterButtons from "@/components/funding/FilterButton";
import CampaignCard from "@/components/funding/CampaignCard";
import { transformedCampaigns } from "@/utils/dateUtils";
import NavigateToWriteButton from "@/components/funding/NavigateToWriteButton";

export default function FundingListPage() {
  return (
    <div className="flex min-h-screen flex-col px-8 py-8 relative">
      {/* Filter dropdown */}
      <FilterButtons />

      {/* Projects grid */}
      <div className="relative top-[6vh] mt-[10px] grid grid-cols-2 gap-3 max-h-[66vh] overflow-y-scroll scrollbar-none">
        {transformedCampaigns.map((campaign) => (
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
