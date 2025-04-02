"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";

const DonationLoadingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/donation/complete");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <BackButton />
      <div className="flex flex-col h-[40vh] justify-center items-center gap-8">
        <Image
          src="/assets/images/load.gif"
          alt="Loading"
          width="100"
          height="100"
        />
        <div className="flex flex-col justify-center items-center gap-1 text-secondary font-semibold ">
          <span className="text-lg">당신의 마음이 전달되고 있습니다.</span>
          <span className="text-md">잠시만 기다려주세요.</span>
        </div>
      </div>
    </>
  );
};

export default DonationLoadingPage;
