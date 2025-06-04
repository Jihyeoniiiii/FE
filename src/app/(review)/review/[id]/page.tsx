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
      <div className="flex flex-col items-center px-2 text-secondary space-y-8">
        {/* 리뷰 카드 */}
        <div className="w-80 rounded-xl bg-white p-3 flex flex-col items-center my-6 shadow-md gap-y-2">
          <p className="text-center text-sm mb-3">
            이 게시글에 대한 리뷰입니다.
          </p>
          {fundingDetailData?.fundingImages?.[0]?.fileUrl ? (
            <Image
              src={fundingDetailData.fundingImages[0].fileUrl}
              alt="펀딩 이미지"
              width={150}
              height={100}
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
        <div className="flex flex-col items-center w-80 space-y-8">
          {/* 제목 */}
          <div className="w-full border-b-2 border-gray-500 pb-2">
            <p className="text-lg text-secondary text-center">
              {reviewDetailData?.data.title}
            </p>
          </div>

          {/* 이미지 */}
          {reviewDetailData?.data.reviewImages?.[0]?.fileUrl ? (
            <Image
              src={reviewDetailData.data.reviewImages[0].fileUrl}
              alt="리뷰 이미지"
              width={350}
              height={200}
              className="w-full h-48 object-cover rounded-xl shadow-sm"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
              이미지가 없습니다.
            </div>
          )}

          {/* 메시지 박스 */}
          <div className="bg-white p-5 rounded-xl shadow-md w-full h-auto text-center">
            <p>{reviewDetailData?.data.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
