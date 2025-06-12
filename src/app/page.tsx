"use client";

import React from "react"; // React 임포트
import Cat from "@/components/Cat";
import BottomMenu from "@/components/main/BottomMenu";
import ProgressBar from "@/components/main/ProgressBar";
import TopMenu from "@/components/main/TopMenu";
import { useCat } from "@/hooks/useCat";
import Image from "next/image"; 

export default function Home() {
  const {
    data: catInfo,
    isPending: isCatPending,
    isError: isCatError,
  } = useCat();

  const [animationState, setAnimationState] = React.useState<boolean>(false);
  const [shrinking, setShrinking] = React.useState<boolean>(false);

  React.useEffect(() => {
    let shrinkDelayTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    if (animationState) {
      setShrinking(false); 

      shrinkDelayTimer = setTimeout(() => {
        setShrinking(true); 
      }, 500); 

      hideTimer = setTimeout(() => {
        setAnimationState(false); 
        setShrinking(false); 
      }, 1000); 

      return () => {
        clearTimeout(shrinkDelayTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [animationState]);

  //  애니메이션을 트리거할 함수
  const triggerConfettiAnimation = React.useCallback(() => {
    if (animationState) return; // 이미 애니메이션 중이면 중복 실행 방지
    setAnimationState(true);
  }, [animationState]);


  if (isCatPending) {
    return (
      <div className="flex flex-col h-screen">
        <TopMenu />
        <div className="flex flex-col py-10">...Loading</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <TopMenu />
      <div className="flex flex-col justify-between flex-grow pb-90">
        <div className="flex flex-col py-10">
          <ProgressBar
            catInfo={catInfo}
            isCatPending={isCatPending}
            isCatError={isCatError}
          />
        </div>

        <div className="relative flex justify-center items-center">
          <Cat level={catInfo?.level} />
        </div>

        {/* 트리거 함수를 props로 전달. */}
        <BottomMenu onTriggerConfetti={triggerConfettiAnimation} />
      </div>

      {animationState && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9999]">
          <div
            className={`relative w-full h-full max-w-[390px] -translate-x-12 -translate-y-[-40%] ${
              shrinking ? "animate-confettiShrink" : ""
            }`}
            style={{
              transformOrigin: "center center",
            }}>
            <Image
              height={300}
              width={300}
              src="/assets/images/congratulations.gif"
              alt="축하 컨페티"
              className="object-contain" 
            />
          </div>
        </div>
      )}
    </div>
  );
}
