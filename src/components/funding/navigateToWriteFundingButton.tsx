"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const NavigateToWriteFundingButton = () => {
  const router = useRouter();
  return (
    <Button
      className="bg-primary text-white text-base font-semibold rounded-2xl"
      onClick={() => {
        router.push("/funding/write");
      }}>
      {" "}
      등록하기
    </Button>
  );
};

export default NavigateToWriteFundingButton;
