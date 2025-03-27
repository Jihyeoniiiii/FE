"use client";

import { Button } from "@/components/ui/button";
import { loginButtonStyles } from "@/styles/styles";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SiNaver } from "react-icons/si";
import kakaoLogo from "@assets/images/카카오.png";

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
          src={kakaoLogo}
          width={25}
          height={35}
          alt="카카오"
          className="absolute left-3"
        />
        <span className="text-lg font-medium">카카오 로그인</span>
      </Button>

      <Button
        className={clsx(
          loginButtonStyles,
          "bg-green-500 hover:bg-green-600 text-white"
        )}>
        <SiNaver size={40} className="absolute left-4" />
        <span className="text-lg font-medium">네이버 로그인</span>
      </Button>
    </div>
  );
}

const buttonWrapperStyle =
  "absolute bottom-24 flex flex-col space-y-4 transition-opacity duration-1000 opacity-100";
