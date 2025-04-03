"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { rewardList } from "@/lib/donationReward";
import ConfirmButton from "@/components/ConfirmButton";

export default function NotifyPage () {
  const [showBomb, setShowBomb] = useState(true); // 1초 후 숨길 상태
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBomb(false);
    }, 900); // 1초 후 사라짐

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 제거
  }, []);


  return (
    <div
      className="flex min-h-screen flex-col items-center justify-start"
      onClick={() => {
        router.push("/");
      }}>
      <div className="relative top-30 text-xl text-primary">기부 혜택</div>
      {rewardList.map((reward) => {
        return (
          <div key={reward.id} className="relative top-50">
            <div className="grid grid-cols-3 gap-10 py-5">
              <Image height={reward.height} width={reward.width} src={reward.src} alt={reward.alt} />
              <h1 className="flex items-center text-secondary">
                {reward.label}
              </h1>
              <h1 className="flex items-center text-secondary">
                {reward.times}회
              </h1>
            </div>
          </div>
        );
      })}

      <div className="relative top-75">
        <ConfirmButton />
      </div>
      <div className="fixed ">
        {/* 1초 동안만 폭죽 GIF 표시 */}
        {showBomb && (
          <Image
            height={700}
            width={500}
            src="/assets/images/bomb.gif"
            alt="폭죽"
          />
        )}
      </div>
    </div>
  );
};

