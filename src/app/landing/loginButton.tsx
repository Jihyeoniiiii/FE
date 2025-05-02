"use client";

import { Button } from "@/components/ui/button";
import { loginButtonStyles } from "@/styles/styles";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SiNaver } from "react-icons/si";
import kakao from "@assets/images/kakao-logo.png";
import { useRouter } from "next/navigation";

export default function LoginButtons() {
  const kakaoLoginUrl = process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL!;
  const naverLoginUrl = process.env.NEXT_PUBLIC_NAVER_LOGIN_URL!;
  const [showButtons, setShowButtons] = useState(false);
  const router = useRouter();
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
        )}
        onClick={() => router.push(kakaoLoginUrl)}>
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
        )}
        onClick={() => router.push(naverLoginUrl)}>
        <SiNaver size={50} className="absolute left-8" />
        <span className="text-lg font-medium">네이버 로그인</span>
      </Button>
    </div>
  );
}

const buttonWrapperStyle = "absolute bottom-24 flex flex-col space-y-4 ";
