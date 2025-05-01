import ConfirmButton from "@/components/ConfirmButton";
import React from "react";

const FundingRegisterPage = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col justify-center items-center text-lg text-secondary font-semibold">
        <span>기부 요청이 정상적으로 </span>
        <span>제출되었습니다.</span>
        <span>관리자가 검토한 후에 빠른 시일 내에</span>
        <span>심사 결과를 알려드리겠습니다.</span>
      </div>
      <ConfirmButton />
    </div>
  );
};

export default FundingRegisterPage;
