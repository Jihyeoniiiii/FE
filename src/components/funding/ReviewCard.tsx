import React from "react";
import Image from "next/image";
import { useFunding } from "@/hooks/useFunding";

type ReviewCardProps = {
  fundingId?: number;
};

const ReviewCard = ({ fundingId }: ReviewCardProps) => {
  const { fundingQuery } = useFunding({ fundingId: fundingId });
  const {
    data: fundingDetail,
    isPending: isFundingPending,
    isError: isFundingError,
    error: fundingError,
  } = fundingQuery;

  const displayImageUrl: string | null =
    fundingDetail?.fundingImages && fundingDetail.fundingImages.length > 0
      ? fundingDetail.fundingImages[0].fileUrl
      : null;

  const displayTitle = fundingDetail?.title;

  if (isFundingPending) {
    return (
      <div className="flex flex-col pt-6 animate-pulse">
        <div className="w-full h-[100px] bg-gray-200 rounded-lg object-cover" />
        <div className="h-4 bg-gray-200 w-3/4 mt-4 rounded"></div>
      </div>
    );
  }

  if (isFundingError) {
    console.error("펀딩 상세 정보 로딩 오류:", fundingError);
  }

  return (
    <div className="flex flex-col pt-6">
      {displayImageUrl ? (
        <Image
          src={displayImageUrl}
          alt={displayTitle || "펀딩 프로젝트"}
          width={150}
          height={100}
          className="w-full h-auto rounded-lg object-cover"
        />
      ) : (
        <div className="w-full h-[100px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          펀딩 이미지가 없습니다.
        </div>
      )}
      <p className="text-sm text-secondary mt-4 text-left">
        {displayTitle && displayTitle.length > 13
          ? displayTitle.slice(0, 13) + ".."
          : displayTitle || "제목 없음"}
      </p>
    </div>
  );
};

export default ReviewCard;
