import { Button } from "@/components/ui/button";
import React from "react";

const FundingRegisterPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col justify-center items-center text-lg text-secondary">
        <span>기부 요청이 정상적으로 </span>
        <span>제출되었습니다.</span>
        <span>관리자가 검토한 후에 빠른 시일 내에</span>
        <span>심사 결과를 알려드리겠습니다.</span>
      </div>
      <Button className="font-semibold">확인</Button>
    </div>
  );
};

export default FundingRegisterPage;
