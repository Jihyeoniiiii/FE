"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <div className="pl-6 pt-8 pb-3">
      <button onClick={() => router.back()} className="cursor-pointer">
        {" "}
        <Image
          src={"/assets/icons/back.svg"}
          alt="Back"
          width={30}
          height={30}
          className="cursor-pointer"
        />
      </button>
    </div>
  );
};

export default BackButton;
