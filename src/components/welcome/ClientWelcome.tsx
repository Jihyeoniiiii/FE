"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import cat from "@assets/images/cat.svg";
import { centerImageStyles, mainStyles } from "@/styles/styles";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";

const ClientWelcome = () => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const userData = userStore((state) => state.userData);
  useEffect(() => {
    // 200ms마다 텍스트 표시 상태를 토글하는 인터벌 설정
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 700);

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(interval);
  }, []);
  if (!userData) {
    return <div>Loading...</div>; // 데이터가 없을 경우 로딩 상태 표시
  }
  return (
    <main
      className={mainStyles}
      onClick={() => {
        router.prefetch("/");
        router.push("/");
      }}>
      <div className={centerImageStyles}>
        <Image
          src={cat || "/placeholder.svg"}
          alt="Cat"
          width={180}
          height={180}
        />
        <h2
          className={`${textStyle} transition-opacity duration-100`}
          style={{ opacity: isVisible ? 1 : 0 }}>
          {userData.name}님, 반가워요!
        </h2>
      </div>
    </main>
  );
};

export default ClientWelcome;
const textStyle = "text-sky-950 text-2xl font-semibold tracking-wide";
