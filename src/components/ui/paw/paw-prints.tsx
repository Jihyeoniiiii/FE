"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import 발자국 from "@assets/images/발자국.png";

// 발자국 위치 데이터 (x, y 좌표와 회전 각도)
const pawPositions = [
  { x: 100, y: 100, rotate: 40 },
  { x: 130, y: 120, rotate: 45 },
  { x: 150, y: 100, rotate: 35 },
  { x: 185, y: 112, rotate: 25 },
  { x: 195, y: 80, rotate: 25 },
  { x: 230, y: 90, rotate: 25 },
  { x: 240, y: 50, rotate: 25 },
  { x: 275, y: 60, rotate: 25 },
  { x: 290, y: 25, rotate: 50 },
  { x: 320, y: 55, rotate: 50 },
  { x: 340, y: 35, rotate: 50 },
  { x: 370, y: 65, rotate: 50 },
  { x: 390, y: 45, rotate: 50 },
  { x: 420, y: 75, rotate: 50 },
  { x: 430, y: 30, rotate: 15 },
  { x: 465, y: 40, rotate: 15 },
  { x: 470, y: 10, rotate: 50 },
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
    const appearInterval = 200;

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
            "absolute w-10 h-10 opacity-0 transition-opacity duration-500 ease-in-out",
            visiblePaws.includes(index) && "opacity-100"
          )}
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: `rotate(${pos.rotate}deg)`,
          }}>
          <Image
            src={발자국 || "/placeholder.svg"}
            alt="발자국"
            width={40}
            height={40}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
