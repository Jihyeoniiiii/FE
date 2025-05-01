"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface BackButtonProps {
  children?: ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="pl-3 pt-4 flex items-center space-x-2">
      <button onClick={() => router.back()} className="cursor-pointer">
        <Image
          src={"/assets/icons/back.svg"}
          alt="Back"
          width={30}
          height={30}
        />
      </button>
      <span className="text-secondary font-semibold text-lg opacity-80">
        {children}
      </span>
    </div>
  );
};

export default BackButton;
