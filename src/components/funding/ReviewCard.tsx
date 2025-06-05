"use client";

import React from "react";
import Image from "next/image";
import { useReviewDetail } from "@/hooks/useReview";
import { useFundingDetail } from "@/hooks/useFunding";
import { ReviewDetailItem, ReviewItem } from "@/lib/api/review";
import { FundingData } from "@/lib/api/funding";
import Link from "next/link";

type ReviewCardWithIdProps = {
  type: "review" | "funding";
  fundingId?: number;
};

type ReviewCardWithDataProps = {
  type: "review" | "funding";
  data?: ReviewDetailItem | FundingData | ReviewItem | null;
};

export const ReviewCardWithId = ({
  type,
  fundingId,
}: ReviewCardWithIdProps) => {
  const reviewDetailQuery = useReviewDetail(
    type === "review" ? fundingId : undefined
  );
  const fundingDetailQuery = useFundingDetail(
    type === "funding" ? fundingId : undefined
  );

  const isPending =
    type === "review"
      ? reviewDetailQuery.isPending
      : fundingDetailQuery.isPending;
  const isError =
    type === "review" ? reviewDetailQuery.isError : fundingDetailQuery.isError;
  const data =
    type === "review" ? reviewDetailQuery.data?.data : fundingDetailQuery.data;

  return (
    <ReviewCardBase
      type={type}
      isPending={isPending}
      isError={isError}
      data={data}
    />
  );
};

export const ReviewCardWithData = ({ type, data }: ReviewCardWithDataProps) => {
  const fundingId =
    data && "fundingId" in data && typeof data.fundingId === "number"
      ? data.fundingId
      : undefined;

  return (
    <ReviewCardBase
      type={type}
      isPending={false}
      isError={!data}
      data={data}
      fundingId={fundingId}
    />
  );
};

type ReviewCardBaseProps = {
  type: "review" | "funding";
  isPending: boolean;
  isError: boolean;
  data?: ReviewDetailItem | FundingData | ReviewItem | null;
  fundingId?: number;
};

const ReviewCardBase = ({
  type,
  isPending,
  isError,
  data,
  fundingId,
}: ReviewCardBaseProps) => {
  const title = data?.title ?? "제목 없음";
  const imageUrl =
    type === "review"
      ? (data as ReviewDetailItem)?.reviewImages?.[0]?.fileUrl ?? null
      : (data as FundingData)?.fundingImages?.[0]?.fileUrl ?? null;

  if (isPending) {
    return (
      <div className="flex flex-col pt-6 animate-pulse">
        <div className="w-full h-[100px] bg-gray-200 rounded-lg" />
        로딩중입니다.
        <div className="h-4 bg-gray-200 w-3/4 mt-4 rounded" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col pt-6">
        <div className="w-full h-[100px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          {type === "review"
            ? "리뷰 데이터를 불러올 수 없습니다."
            : "펀딩 데이터를 불러올 수 없습니다."}
        </div>
        <p className="text-sm text-secondary mt-4 text-left">제목 없음</p>
      </div>
    );
  }

  return (
    <Link href={`/review/${data.id}?fundingId=${fundingId}`}>
      <div className="flex flex-col pt-6 transition-opacity duration-300 hover:opacity-40">
        <div className="relative w-full h-[120px] rounded-lg overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="w-full h-auto rounded-lg object-cover"
            />
          ) : (
            <div className="w-full h-[100px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              리뷰 이미지가 없습니다.
            </div>
          )}{" "}
        </div>
        <p className="text-sm text-secondary mt-4 text-left truncate">
          {title}
        </p>
      </div>
    </Link>
  );
};
