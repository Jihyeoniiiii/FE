"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import paw from "@assets/images/paw.png";

// 발자국 위치 데이터 (x, y 좌표와 회전 각도)
const pawPositions = [
  { x: 100, y: 100, rotate: 78 },
  { x: 135, y: 125, rotate: 83 }, 
  { x: 160, y: 100, rotate: 73 },
  { x: 200, y: 115, rotate: 63 },
  { x: 215, y: 80, rotate: 63 },
  { x: 255, y: 95, rotate: 63 },
  { x: 270, y: 50, rotate: 63 },
  { x: 310, y: 65, rotate: 63 },
  { x: 330, y: 25, rotate: 88 },
  { x: 365, y: 60, rotate: 88 },
  { x: 390, y: 35, rotate: 88 },
  { x: 425, y: 70, rotate: 88 },
  { x: 450, y: 45, rotate: 88 },
  { x: 485, y: 80, rotate: 88 },
  { x: 500, y: 30, rotate: 53 },
  { x: 540, y: 45, rotate: 53 },
  { x: 550, y: 10, rotate: 88 },
];

export default function PawPrints() {
  const [visiblePaws, setVisiblePaws] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 이미 모든 발자국이 표시되었다면 더 이상 진행하지 않음
    if (currentIndex >= pawPositions.length) {
      return;
    }

    // 발자국 나타나는 간격 (밀리초)
    const appearInterval = 130;

    // 다음 발자국을 나타나게 하는 타이머
    const timer = setTimeout(() => {
      // 현재 인덱스의 발자국 추가
      setVisiblePaws((prev) => [...prev, currentIndex]);
      setCurrentIndex((prev) => prev + 1);

      // 발자국이 사라지는 타이머 설정 (360ms 후)
      setTimeout(() => {
        setVisiblePaws((prev) => {
          // 첫 번째 발자국 제거 (가장 먼저 나타난 발자국)
          const newPaws = [...prev];
          newPaws.shift();
          return newPaws;
        });
      }, 720);
    }, appearInterval);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-full">
      {pawPositions.map((pos, index) => (
        <div
          key={index}
          className={cn(
            "absolute w-12 h-10 opacity-0 transition-opacity duration-500 ease-in-out",
            visiblePaws.includes(index) && "opacity-100"
          )}
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: `rotate(${pos.rotate}deg)`,
          }}>
          <Image
            src={paw}
            alt="paw"
            width={40}
            height={40}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
