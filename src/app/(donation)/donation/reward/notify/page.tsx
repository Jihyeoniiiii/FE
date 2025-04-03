"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { rewardList } from "@/lib/donationReward";
import ConfirmButton from "@/components/ConfirmButton";
import useToast from "@/hook/useToast";

export default function NotifyPage() {
  const [showBomb, setShowBomb] = useState(true); // 1초 후 숨길 상태
  const router = useRouter();
  const { showToast } = useToast();

  const handleNotifyClick = () => {
    router.push("/");

    setTimeout(() => {
      showToast(
        "success",
        "기부 혜택이 주어졌습니다. 마음을 나눠주셔서 감사합니다!",
        {
          position: "top-center",
          closeButton: false,
          autoClose: 3000, // 3초 후 자동 닫힘
          hideProgressBar: true,
          icon: (
            <Image
              height={30}
              width={30}
              alt="알람종"
              src="/assets/icons/alarm.svg"
            />
          ),
        }
      );
    }, 500); // 0.5초 후 실행
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBomb(false);
    }, 900); // 0.9초 후 사라짐

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 제거
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-start"
      onClick={handleNotifyClick}>
      <div className="relative top-30 text-xl text-primary">기부 혜택</div>
      {rewardList.map((reward) => {
        return (
          <div key={reward.id} className="relative top-50">
            <div className="grid grid-cols-3 gap-10 py-5">
              <Image
                height={reward.height}
                width={reward.width}
                src={reward.src}
                alt={reward.alt}
              />
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
        {/* 0.9초 동안만 폭죽 GIF 표시 */}
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
}
