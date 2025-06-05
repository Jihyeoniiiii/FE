"use client";

import { ReviewCardWithData } from "@/components/funding/ReviewCard";
import { useReviewList } from "@/hooks/useReview";
import Dropdown from "@/components/ui/Dropdown";

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
    <div className="flex min-h-[100dvh] flex-col px-6 py-7.5 relative">
      <div className="absolute top-[3vh] flex">
        <Dropdown
          options={["최신순"]}
          onSelect={(value) => {
            console.log("선택됨:", value);
          }}
        >
          최신순
        </Dropdown>
      </div>
      {/* Projects grid */}
      <div style={{ height: "calc(100dvh - 9rem)" }} className="relative top-[6vh] mt-[10px]overflow-y-auto scrollbar-none">
        <div className="grid grid-cols-2 gap-2">
        {reviewListData?.data?.values.map((review) => (
          <div
            key={review.id}
            className="border-2 border-white-50 rounded-lg py-2 px-4 bg-white-50"
          >
            <ReviewCardWithData data={review} type="review" />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}