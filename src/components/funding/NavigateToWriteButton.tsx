"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const NavigateToWriteButton = () => {
  const router = useRouter();
  return (
    <Button
      size="none"
      className="px-6 py-1.5 text-white text-base font-semibold rounded-2xl"
      onClick={() => {
        router.push("/funding/write");
      }}>
      등록하기
    </Button>
  );
};

export default NavigateToWriteButton;
