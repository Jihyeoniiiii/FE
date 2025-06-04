"use client"

import { ChevronDown } from "lucide-react";
import { ReviewCardWithData } from "@/components/funding/ReviewCard";
import { useReviewList } from "@/hooks/useReview";

export default function ReviewListPage() {
  const {
    data: reviewListData,
    isPending: isReviewListPending,
    isError: isReviewListError,
  } = useReviewList({ limit: 8 });

    if (isReviewListPending) {
    return <div>리뷰를 불러오는 중...</div>;
  }

  if (isReviewListError) {
    return <div>리뷰를 불러오는데 오류가 발생했습니다.</div>;
  }

  return (
    <div className="flex min-h-screen flex-col px-8 py-10 relative">
      <div className="absolute top-[3vh] flex">
        <button className={StButton}>
          최신순 <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      {/* Projects grid */}
      <div className="relative top-[2vh] mt-[6px] grid grid-cols-2 gap-5 max-h-[calc(100vh-8vh-4rem)] overflow-y-scroll scrollbar-none">
        {reviewListData?.data?.values.map((review) => (
          <ReviewCardWithData key={review.id} data={review} type={"review"} />
        ))}
      </div>
    </div>
  );
}

const StButton =
  "flex items-center gap-1 bg-white text-sm rounded-lg px-2 py-1.5 shadow-sm";
