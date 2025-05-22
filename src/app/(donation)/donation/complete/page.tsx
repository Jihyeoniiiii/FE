"use client"

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { useFunding } from "@/hooks/useFunding";
import { usePaymentStore } from "@/store/paymentStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const DonationCompletePage = () => {
  const selectedFundingId = usePaymentStore((state) => state.selectedFundingId);
  const { fundingQuery } = useFunding(
    selectedFundingId !== null ? selectedFundingId : undefined
  );
  const { data: fundingDetail, isPending, isError, error } = fundingQuery;
  const router = useRouter();

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return console.log(`오류 발생: ${error?.message}`);
  }

  if (!fundingDetail) {
    return <div>펀딩 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <BackButton />
      <div className="flex flex-col h-[78vh] justify-center items-center text-secondary gap-8">
        <Image
          src="/assets/images/heart.png"
          alt="Heart"
          width={80}
          height={80}
          className="opacity-90"
        />
        <div className="flex flex-col items-center text-lg">
          <span>당신의 소중한 마음이</span>
          <span>잘 전달되었습니다.</span>
        </div>
        <div className="flex flex-col items-center gap-5">
          <Image
            src={
              fundingDetail?.fundingImages?.[0]?.fileUrl ??
              "/assets/images/study.png"
            }
            alt={fundingDetail?.title || "펀딩 이미지"}
            width={300}
            height={150}
            className="rounded-xl"
          />
          <span>{fundingDetail?.title || "제목 없음"}</span>
        </div>
        <Button
          variant="soft"
          className="w-[77%] text-md p-6.5 mt-5 rounded-xl"
          onClick={() => router.push('/')}
        >
          확인
        </Button>
      </div>
    </>
  );
};

export default DonationCompletePage;
