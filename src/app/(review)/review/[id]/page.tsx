"use client";

import Image from "next/image";
import BackButton from "@/components/BackButton";
import { useReviewDetail } from "@/hooks/useReview";
import { useSearchParams } from "next/navigation";
import { useFundingDetail } from "@/hooks/useFunding";

export default function ReviewDetailPage() {
  const searchParams = useSearchParams();
  const fundingId = searchParams.get("fundingId")
    ? Number(searchParams.get("fundingId"))
    : undefined;
  const {
    data: reviewDetailData,
    isPending: isReviewDetailPending,
    isError: isReviewDetailError,
  } = useReviewDetail(fundingId);

  const {
    data: fundingDetailData,
    isPending: isFundingDetailPending,
    isError: isFundingDetailError,
  } = useFundingDetail(fundingId);

  if (isReviewDetailPending || isFundingDetailPending) {
    return (
      <>
        <BackButton />
        <div className="flex flex-col items-center justify-center h-64 text-gray-500 animate-pulse">
          로딩 중입니다...
        </div>
      </>
    );
  }

  if (
    isReviewDetailError ||
    !reviewDetailData ||
    isFundingDetailError ||
    !fundingDetailData
  ) {
    return (
      <>
        <BackButton />
        <div className="flex flex-col items-center justify-center h-64 text-red-500 text-center">
          데이터를 불러올 수 없습니다. <br />
          잠시 후 다시 시도해주세요.
        </div>
      </>
    );
  }

  return (
    <>
      <BackButton />
      <div className="flex flex-col items-center px-2 text-secondary space-y-8 overflow-y-auto scrollbar-none">
        {/* 리뷰 카드 */}
        <div className="w-70 rounded-xl bg-white opacity-80 p-3 flex flex-col items-center my-6 shadow-md gap-y-2">
          <p className="text-center text-sm mb-3">
            이 게시글에 대한 리뷰입니다.
          </p>
          {fundingDetailData?.fundingImages?.[0]?.fileUrl ? (
            <Image
              src={fundingDetailData.fundingImages[0].fileUrl}
              alt="펀딩 이미지"
              width={70}
              height={70}
              className="rounded-lg mb-2"
            />
          ) : (
            <div className="w-[150px] h-[100px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 mb-2">
              이미지 없음
            </div>
          )}
          <p className="text-sm text-center">{fundingDetailData?.title}</p>
        </div>

        {/* 펀딩 후기 섹션 */}
        <div className="flex flex-col items-center w-80 space-y-6">
          {/* 제목 */}
          <p className="text-md text-secondary text-center">
            {reviewDetailData?.data.title}
          </p>

          {/* 이미지 */}
          {(() => {
            const imageData = reviewDetailData?.data.reviewImages;
            const imageUrl = Array.isArray(imageData)
              ? imageData[0]?.fileUrl
              : imageData?.fileUrl;

            return imageUrl ? (
              <div className="relative w-[90%] h-[180px] rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="리뷰 이미지"
                  fill
                  className="object-cover"
                />
              </div>
            ) : null;
          })()}

          {/* 메시지 박스 */}
          <div className="bg-white opacity-80 p-5 rounded-xl shadow-md w-full h-auto text-center">
            <p>{reviewDetailData?.data.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
