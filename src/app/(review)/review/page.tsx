import { ChevronDown } from "lucide-react";
import { reviewData } from "@/lib/reviewData";
import ReviewCard from "@/components/funding/ReviewCard";

export default function ReviewListPage() {
  return (
    <div className="flex min-h-screen flex-col px-8 py-10 relative">
      <div className="absolute top-[3vh] flex">
        <button className={StButton}>
          최신순 <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      {/* Projects grid */}
      <div className="relative top-[2vh] mt-[6px] grid grid-cols-2 gap-5 max-h-[calc(100vh-8vh-4rem)] overflow-y-scroll scrollbar-none">
        {reviewData.map((review) => (
          <ReviewCard key={review.id} reviewData={review} />
        ))}
      </div>
    </div>
  );
}

const StButton =
  "flex items-center gap-1 bg-white text-sm rounded-lg px-2 py-1.5 shadow-sm";
