"use client";

import { useParams } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import 공부 from "@assets/images/study.png";
import 프로필 from "@assets/icons/profile.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import { useFunding } from "@/hooks/useFunding";
import { userStore } from "@/store/userStore";
import { getRemainingDays } from "@/utils/dateUtils";

export default function FundingDetailCard() {
  const { id } = useParams();
  const fundingId = Number(id);
  const { fundingQuery } = useFunding(fundingId);
  const { data: fundingDetail, isLoading, isError, error } = fundingQuery;
  const userData = userStore((state) => state.userData);

  const remainingDaysText = fundingDetail?.endDate
    ? getRemainingDays(fundingDetail.endDate)
    : "";
  const isClosingSoon =
    remainingDaysText === "오늘 마감" || remainingDaysText === "마감 임박";

  if (isLoading) {
    return <div>Loading funding details...</div>;
  }

  if (isError) {
    return <div>Error loading funding details: {error?.message}</div>;
  }

  if (!fundingDetail) {
    return <div>Funding not found.</div>;
  }

  return (
    <>
      <BackButton />
      <div className="flex flex-col px-2 ">
        <div className=" p-6 space-y-2">
          {/* Header */}
          <h2
            className="text-xl font-medium text-secondary"
            style={{ fontWeight: 500 }}
          >
            {fundingDetail.title}
          </h2>

          {/* Profile */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-13 w-13 bg-[#d8e6ff]">
                <div className="flex items-center justify-center h-full ">
                  {userData?.profileImage ? (
                    <Image
                      width="50"
                      height="50"
                      src={userData.profileImage}
                      alt="프로필"
                    />
                  ) : (
                    <Image
                      width="50"
                      height="50"
                      src={프로필}
                      alt="기본 프로필"
                    />
                  )}
                </div>
              </Avatar>
              <span className="font-medium text-secondary">
                {userData?.name}
              </span>{" "}
              {/* TODO: 작성자 정보 연결 */}
            </div>
            <div
              className="flex items-center text-sm text-secondary"
              style={{ fontWeight: 300 }}
            >
              <CheckCircle className="h-4 w-4 mr-1 text-secondary" />
              <span>
                {new Date(fundingDetail.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Funding Goal */}
          <div className="space-y-2">
            <div className="flex items-center justify-center mb-3">
              <span className="text-secondary font-bold mr-2 text-2xl">
                목표 :
              </span>
              <span className="text-primary font-bold text-2xl">
                {fundingDetail.goalAmount?.toLocaleString()}원
              </span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="font-medium text-secondary text-2xl">
                총 {fundingDetail.currentAmount?.toLocaleString()}원 모금
              </div>
              {/* TODO: 마감일 처리 */}
              {fundingDetail?.endDate && (
                <Badge
                  className={`text-sm px-2 ${
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
          </div>

          {/* Image */}
          <div className="rounded-xl overflow-hidden">
            <Image
              src={fundingDetail?.fundingImages?.[0]?.fileUrl || 공부}
              alt={fundingDetail?.title}
              width={350}
              height={200}
              className="w-full h-50 object-contain"
            />
          </div>

          {/* Message */}
          <div className="my-4 h-33 bg-white p-4 rounded-xl">
            <p className="text-secondary">{fundingDetail?.content}</p>
          </div>

          <div className="flex items-center justify-center">
            <Button className="w-80 py-6 text-lg rounded-xl">
              마음 나누기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
