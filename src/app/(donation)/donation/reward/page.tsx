"use client";

import { mainStyles } from "@/styles/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function RewardPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/donation/reward/notify");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={mainStyles}>
      <div className="text-xl text-secondary ">과연 어떤 혜택이 나올까요?</div>
      <Image
        height={400}
        width={400}
        src="/assets/images/randombox.gif"
        alt="랜덤박스"></Image>
    </div>
  );
}
