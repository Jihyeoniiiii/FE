"use client";

import { Button } from "@/components/ui/button";
import { loginButtonStyles } from "@/styles/styles";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SiNaver } from "react-icons/si";
import kakao from "@assets/images/kakao-logo.png";

export default function LoginButtons() {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 4초 후 실행 로직
    const timer = setTimeout(() => {
      if (!token) {
        setShowButtons(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!showButtons) {
    return null;
  }

  return (
    <div className={buttonWrapperStyle}>
      <Button
        className={clsx(
          loginButtonStyles,
          "bg-yellow-300 hover:bg-yellow-600 text-black"
        )}>
        <Image
          src={kakao}
          width={27}
          height={35}
          alt="kakao-logo"
          className="absolute left-7"
        />
        <span className="text-lg font-medium">카카오 로그인</span>
      </Button>

      <Button
        className={clsx(
          loginButtonStyles,
          "bg-green-500 hover:bg-green-600 text-white"
        )}>
        <SiNaver size={50} className="absolute left-8" />
        <span className="text-lg font-medium">네이버 로그인</span>
      </Button>
    </div>
  );
}

const buttonWrapperStyle = "absolute bottom-24 flex flex-col space-y-4 ";
