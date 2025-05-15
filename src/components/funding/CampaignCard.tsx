"use client"

import React, { useEffect } from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import Image from "next/image";
import 공부 from "@assets/images/study.png";
import { useFunding } from "@/hooks/useFunding";
import { FundingData } from "@/lib/api/funding";

const CampaignCard = ({ campaign }: { campaign: FundingData }) => {
  const { fundingQuery, refetchFunding } = useFunding(campaign.id ? Number(campaign.id) : undefined);
  const { isLoading, isError, error } = fundingQuery;

  useEffect(() => {
    if (campaign.id) {
      refetchFunding();
      console.log(campaign.id)
    }
  }, [campaign.id, refetchFunding]);

  if (isLoading) {
    console.log(`Campaign ID ${campaign.id} 상세 정보 로딩 중...`);
  }

  if (isError) {
    console.error(`Campaign ID ${campaign.id} 상세 정보 로딩 실패:`, error);
  }

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center justify-between mb-3">
        <div className="relative text-primary text-baseline px-0.5 py-0.5 rounded-md">
          {campaign.currentAmount}% 달성
        </div>
        {campaign.endDate === "오늘 마감" ||
        campaign.endDate === "마감 임박" ? (
          <Badge
            className=" bg-accent text-accent text-sm px-1"
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              fontWeight: 600,
            }}>
            {campaign.endDate}
          </Badge>
        ) : (
          <Badge
            className=" bg-white text-secondary text-sm px-1"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              fontWeight: 600,
            }}>
            {campaign.endDate}
          </Badge>
        )}
      </div>
      <Link href={`/funding/${campaign.id}`}>
        <Image
          src={campaign.fundingImages?.[0]?.fileUrl || 공부}
          alt="펀딩 프로젝트"
          width={150}
          height={100}
          className="w-full h-auto rounded-lg object-cover"
        />
        <p className="text-xs mt-2.5 text-left">
          {campaign.title.length > 17
            ? campaign.title.slice(0, 16) + ".."
            : campaign.title}
        </p>
      </Link>
    </div>
  );
};

export default CampaignCard;
