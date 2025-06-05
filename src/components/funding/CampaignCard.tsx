"use client";

import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import Image from "next/image";
import 공부 from "@assets/images/study.png";
import { FundingData } from "@/lib/api/funding";
import { getRemainingDays } from "@/utils/dateUtils";

interface CampaignCardProps {
  campaign: FundingData;
}

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const progressPercentage = Math.round(
    (campaign.currentAmount / campaign.goalAmount) * 100
  );
  const remainingDaysText = campaign.endDate
    ? getRemainingDays(campaign.endDate)
    : "";
  const isClosingSoon =
    remainingDaysText === "오늘 마감" || remainingDaysText === "마감 임박";

  return (
    <div className="flex flex-col transition-opacity duration-300 hover:opacity-40">
      <div className="relative flex items-center justify-between mb-3">
        <div className="relative text-primary text-sm font-semibold text-baseline px-0.5 py-0.5 rounded-md">
          {progressPercentage}% 달성
        </div>
        {remainingDaysText && (
          <Badge
            className={`text-[11px] px-1 ${
              isClosingSoon
                ? "bg-accent text-accent"
                : "bg-white text-secondary"
            }`}
            style={{
              backgroundColor: isClosingSoon
                ? "rgba(255, 0, 0, 0.1)"
                : "rgba(255, 255, 255, 0.6)",
              fontWeight: 600,
            }}
          >
            {remainingDaysText}
          </Badge>
        )}
      </div>
      <Link href={`/funding/${campaign.id}`}>
        <div className="relative w-full h-[120px] rounded-lg overflow-hidden">
          <Image
            src={campaign.fundingImages?.[0]?.fileUrl || 공부}
            alt="펀딩 프로젝트"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-sm mt-2.5 text-left text-secondary truncate">
          {campaign.title}
        </p>
      </Link>
    </div>
  );
};

export default CampaignCard;
