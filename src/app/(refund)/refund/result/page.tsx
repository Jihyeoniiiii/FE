"use client";

import BackButton from "@/components/BackButton";
import ConfirmButton from "@/components/ConfirmButton";
import { useSearchParams } from "next/navigation";
import React from "react";

const RefundResultPage = () => {
  const params = useSearchParams();
  const deduction = params.get("deduction");

  return (
    <>
      <BackButton />
      <div className="flex flex-col w-full h-[82vh] justify-center px-12 gap-10 text-secondary">
        <div className="flex flex-col">
          <span className="flex text-sm px-7">기부금을 고려했을 때</span>
          <span className="flex justify-center text-xl">
            김민상님의 예상 공제액은
          </span>
        </div>
        <div className="flex w-full h-17 justify-center items-center bg-white font-semibold text-4xl rounded-2xl">
          {deduction}
        </div>
        <div className="border border-white" />
        <div className="flex flex-col px-6 text-xs">
          <span>
            의료비·교육비·연금저축 등 <br /> 추가 공제가 없다고 가정하고
            있습니다.
          </span>
          <span>계산 실제보다 기부금 공제가 더 적용될 수 있습니다.</span>
          <div className="py-3">
            <span>산출세액 = (연봉−근로소득공제−기본공제) × 세율</span>
            <span className="px-13">− 누진공제 기부금 공제액</span>
          </div>
        </div>
        <div className="flex justify-center items-center py-4">
          <ConfirmButton />
        </div>
      </div>
    </>
  );
};

export default RefundResultPage;
