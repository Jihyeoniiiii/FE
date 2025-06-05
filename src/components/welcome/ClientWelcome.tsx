"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import cat from "@assets/images/cat.svg";
import { centerImageStyles } from "@/styles/styles";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";

const BLINK_INTERVAL = 700;
const REDIRECT_DELAY = 3000;

const ClientWelcome = () => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const userData = userStore((state) => state.userData);

  useEffect(() => {
    router.prefetch("/");

    const blinkIntervalId = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, BLINK_INTERVAL);

    const redirectTimerId = setTimeout(() => {
      router.push("/");
    }, REDIRECT_DELAY);

    return () => {
      clearInterval(blinkIntervalId);
      clearTimeout(redirectTimerId);
    };
  }, [router]);

  if (!userData) {
    return (
      <main className="flex items-center justify-center min-h-scree ">
        <div className="text-secondary text-lg font-semibold">Loading...</div>
      </main>
    );
  }

  return (
    <main
      className="flex min-h-[100dvh] flex-col items-center justify-center"
      onClick={() => {
        router.push("/");
      }}>
      <div className={centerImageStyles}>
        <Image src={cat} alt="Cat" width={180} height={180} priority />
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
