import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const DonationCompletePage = () => {
  return (
    <>
      <BackButton />
      <div className="flex flex-col h-[80vh] justify-center items-center text-secondary gap-8">
        <Image src="/assets/images/heart.png" alt="Heart" width={80} height={80} className="opacity-90"/>
        <div className="flex flex-col items-center text-lg">
          <span>당신의 소중한 마음이</span>
          <span>잘 전달되었습니다.</span>
        </div>
        <div className="flex flex-col items-center gap-5">
          <Image
            src="/assets/images/study.png"
            alt="Study"
            width={300}
            height={150}
            className="rounded-xl"
          />
          <span>공부해서 사회에 보답하겠습니다.</span>
        </div>
        <Button variant="soft" className="w-[77%] text-md p-6.5 mt-3.5 rounded-xl">확인</Button>
      </div>
    </>
  );
};

export default DonationCompletePage;
