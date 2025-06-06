"use client";

import { useCat } from "@/hooks/useCat";
import { catStore } from "@/store/catStore";
import { InteractionStore } from "@/store/interactionStore";
import React, { useEffect, useState } from "react";

const ProgressBar = () => {
  const [widthPercent, setWidthPercent] = useState<number>(0);
  const { feed, play, touch, setInteraction } = InteractionStore(
    (state) => state
  );
  const setCatData = catStore((state) => state.setCatData);
  const {
    data: catInfo,
    isPending: isCatPending,
    isError: isCatError,
  } = useCat();

  useEffect(() => {
    console.log("ProgressBar useEffect 실행", { catInfo, feed, play, touch }); // 의존성 배열 값 확인

    if (!isCatPending && catInfo && !isCatError) {
      console.log("고양이정보:", catInfo);
      setCatData({
        ...catInfo,
      });
      const percentage = Math.trunc(catInfo?.levelUpPercentage);
      setWidthPercent(percentage);
    }
  }, [catInfo, setInteraction, setCatData]);

  if (isCatPending) {
    <div>데이터를 불러오는 중입니다.</div>;
  }

  if (isCatError) {
    <div>오류가 발생했습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-center">
        <div
          className="flex w-[80%] h-4 bg-gray-200 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={Number(catInfo?.levelUpPercentage)}
          aria-valuemin={Number(0)}
          aria-valuemax={Number(100)}>
          <div
            className="flex justify-center h-4 rounded-full overflow-hidden bg-primary whitespace-nowrap transition duration-500"
            style={{ width: `${widthPercent}%` }}></div>
        </div>
      </div>
      <div className="flex px-10 sm:px-13 md:px-16 justify-between">
        <span className="flex px-3 bg-white text-sm font-semibold items-center rounded-2xl">
          레벨{catInfo?.level}
        </span>
        <span className="text-sm font-semibold">{widthPercent}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
