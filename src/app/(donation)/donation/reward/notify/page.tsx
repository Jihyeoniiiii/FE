"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ConfirmButton from "@/components/ConfirmButton";
import useToast from "@/hooks/useToast";
import { useDonation } from "@/hooks/useDonation";
import { InteractionRewardItem } from "@/lib/api/donation";
import { interactionIcons } from "@/lib/interactionIcons";
import { rewardList } from "@/lib/donationReward";

export default function NotifyPage() {
  const [showBomb, setShowBomb] = useState(true); // 1초 후 숨길 상태
  const router = useRouter();
  const { showToast } = useToast();
  const { donationRewardQuery } = useDonation();

  const { data: apiResponseData, isPending, isError, error } = donationRewardQuery;

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

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>기부 보상 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>기부 보상 정보를 불러오지 못했습니다: {error?.message}</p>
      </div>
    );
  }

  const actualDonationRewardData = apiResponseData?.success && apiResponseData.data
    ? apiResponseData.data
    : null;

  if (!actualDonationRewardData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="relative top-30 text-2xl text-primary">기부 혜택</div>
        <p className="mt-4 text-secondary">
          받으실 기부 혜택이 없습니다.
        </p>
        <div className="relative top-75">
          <ConfirmButton />
        </div>
      </div>
    );
  }

  const { interactionRewards, pointReward, nonInteractionRewardItemId } =
    actualDonationRewardData;

  const nonInteractionRewardInfo = rewardList.find(
    (item) => item.id === nonInteractionRewardItemId
  );

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-start bg-white"
      onClick={handleNotifyClick}>
      <div className="relative top-30 text-2xl text-primary">기부 혜택</div>
      {interactionRewards && interactionRewards.length > 0 && (
        <div className="relative top-50">
          {interactionRewards.map((reward: InteractionRewardItem, index: number) => (
            <div key={index} className="grid grid-cols-3 gap-10 py-5">
              <div className="flex items-center justify-center">
                <Image
                  height={50}
                  width={50}
                  src={interactionIcons[reward.interactionType]}
                  alt={reward.interactionType}
                />
              </div>
              <h1 className="flex items-center text-secondary">
                {reward.interactionType}
              </h1>
              <h1 className="flex items-center text-secondary">
                {reward.quantity}회
              </h1>
            </div>
          ))}
        </div>
      )}

      {/* 포인트 보상 표시 */}
      {pointReward > 0 && (
        <div className="relative top-50">
          <div className="grid grid-cols-3 gap-11 py-5">
              <span className="text-[#FC6677] font-semibold text-5xl">P</span>
            <h1 className="flex items-center text-secondary">포인트</h1>
            <h1 className="flex items-center text-secondary">
              {pointReward}점
            </h1>
          </div>
        </div>
      )}

      {/* 비상호작용 보상 아이템 표시 */}
      {nonInteractionRewardInfo && (
        <div className="relative top-50 items-center justify-center">
          <div className="grid grid-cols-3 gap-10 py-5">
            <Image
              height={nonInteractionRewardInfo.height || 50}
              width={nonInteractionRewardInfo.width || 50}
              src={nonInteractionRewardInfo.src}
              alt={nonInteractionRewardInfo.alt}
            />
            <h1 className="flex items-center text-secondary">
              {nonInteractionRewardInfo.label}
            </h1>
            <h1 className="flex items-center text-secondary">
            </h1>
          </div>
        </div>
      )}

      {/* 보상이 하나도 없는 경우 */}
      {interactionRewards.length === 0 && pointReward === 0 && (
          <p className="mt-4 text-secondary">받으실 기부 혜택이 없습니다.</p>
      )}

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
