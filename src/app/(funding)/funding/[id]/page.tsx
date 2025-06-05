"use client";

import { useParams } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import 프로필 from "@assets/icons/profile.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import { userStore } from "@/store/userStore";
import { getRemainingDays } from "@/utils/dateUtils";
import { useRouter } from "next/navigation";
import { usePaymentStore } from "@/store/paymentStore";
import { useFundingDetail } from "@/hooks/useFunding";

export default function FundingDetailCard() {
  const { id } = useParams();
  const fundingId = Number(id);
  const {
    data: fundingDetail,
    isPending,
    isError,
    error,
  } = useFundingDetail(fundingId);
  const userData = userStore((state) => state.userData);
  const setSelectedFundingId = usePaymentStore(
    (state) => state.setSelectedFundingId
  );
  const router = useRouter();

  const handlePaymentButtonClick = () => {
    setSelectedFundingId(fundingId);
    router.push("/funding/payment");
  };

  const remainingDaysText = fundingDetail?.endDate
    ? getRemainingDays(fundingDetail.endDate)
    : "";
  const isClosingSoon =
    remainingDaysText === "오늘 마감" || remainingDaysText === "마감 임박";

  if (isPending) {
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
      <div className="flex flex-col px-2">
        <div className="p-6 space-y-2">
          {/* Header */}
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center w-90 h-10 bg-white opacity-80 rounded-2xl">
              <h2
                className={`font-medium text-secondary truncate ${
                  fundingDetail.title.length > 16 ? "text-md" : "text-lg"
                }`}
                style={{ fontWeight: 500 }}
              >
                {fundingDetail.title}
              </h2>
            </div>
          </div>

          {/* Profile */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-13 w-13 bg-[#d8e6ff]">
                <div className="flex items-center justify-center h-full ">
                  {userData?.profileImage ? (
                    <Image
                      width="50"
                      height="50"
                      src={fundingDetail.memberProfileImageUrl}
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
                {fundingDetail.memberName}
              </span>
            </div>
            <div
              className="flex items-center text-sm text-secondary"
              style={{ fontWeight: 300 }}
            >
              <span>
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
              </span>
            </div>
          </div>

          {/* Funding Goal */}
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center w-90 h-23 bg-white-50 border-white border rounded-3xl">
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <span className="text-secondary font-semibold mr-2 text-xl">
                    목표 :
                  </span>
                  <span className="text-primary font-bold text-xl">
                    {fundingDetail.goalAmount?.toLocaleString()}원
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="font-medium text-secondary text-xl">
                    총 {fundingDetail.currentAmount?.toLocaleString()}원 모금
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center items-center rounded-xl overflow-hidden py-2">
            <div className="relative w-full h-[180px] rounded-lg overflow-hidden mx-1.5">
              <Image
                src={
                  fundingDetail?.fundingImages?.[0]?.fileUrl ||
                  `/public/assets/images/chaeum.svg`
                }
                alt={fundingDetail?.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Message */}
          <div className="my-4 mx-1 h-32 bg-white opacity-80 p-4 rounded-xl">
            <p className="text-secondary">{fundingDetail?.content}</p>
          </div>

          <div className="flex items-center justify-center">
            <Button
              className="w-80 py-6 text-lg rounded-xl"
              onClick={handlePaymentButtonClick}
            >
              마음 나누기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
