"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useFundingDetail } from "@/hooks/useFunding";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";

const DonationCompletePage = () => {
  const params = useParams();
  const fundingIdFromQuery = params.id;
  const fundingId = fundingIdFromQuery ? Number(fundingIdFromQuery) : undefined;

  const {
    data: fundingDetail,
    isPending,
    isError,
    error,
  } = useFundingDetail(fundingId);

  const router = useRouter();

  useEffect(() => {
  document.body.style.overflowY = "auto";

  return () => {
    document.body.style.overflowY = "hidden";
  };
}, []);


  if (isPending) return <div>로딩 중...</div>;
  if (isError || !fundingDetail) {
    console.error(`오류 발생: ${error?.message}`);
    return <div>펀딩 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <BackButton />
      <div className="flex flex-col justify-center items-center text-secondary gap-8 pt-12">
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
          <div className="relative w-[300px] h-[200px] rounded-lg overflow-hidden mx-1.5">
          <Image
            src={
              fundingDetail?.fundingImages?.[0]?.fileUrl ??
              "/assets/images/study.png"
            }
            alt={fundingDetail?.title || "펀딩 이미지"}
            fill
            className="object-cover"
          />
          </div>
          <span>{fundingDetail?.title || "제목 없음"}</span>
        </div>
        <Button
          variant="soft"
          className="w-[77%] text-md p-6.5 mt-5 rounded-xl"
          onClick={() => router.push("/donation/reward")}
        >
          확인
        </Button>
      </div>
    </>
  );
};

export default DonationCompletePage;
