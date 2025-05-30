"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useDonation } from "@/hooks/useDonation";
import { usePayment } from "@/hooks/usePayment";
import { usePaymentStore } from "@/store/paymentStore";

const DonationLoadingPage = () => {
  const router = useRouter();
  const impUid = usePaymentStore((state) => state.impUid);
  const merchantUid = usePaymentStore((state) => state.merchantUid);
  const { createDonationMutation } = useDonation();
  const { createPaymentMutation } = usePayment();
  const selectedAmount = usePaymentStore((state) => state.selectedAmount);
  const selectedFundingId = usePaymentStore((state) => state.selectedFundingId);
  const selectedPaymentMethod = usePaymentStore(
    (state) => state.selectedPaymentMethod
  );
  const resetPaymentStore = usePaymentStore((state) => state.resetPaymentState);

  const searchParams = useSearchParams();
  const impUidFromQuery = searchParams.get("imp_uid");
  const merchantUidFromQuery = searchParams.get("merchant_uid");

  const [donationId, setDonationId] = useState<number | null>(null);
  const [hasProcessed, setHasProcessed] = useState(false);

  const effectiveImpUid = impUid || impUidFromQuery;
  const effectiveMerchantUid = merchantUid || merchantUidFromQuery;

  const createDonationFnRef = useRef(createDonationMutation);
  const createPaymentFnRef = useRef(createPaymentMutation);

  useEffect(() => {
    if (!impUid && impUidFromQuery) {
      usePaymentStore.getState().setImpUid(impUidFromQuery);
    }
    if (!merchantUid && merchantUidFromQuery) {
      usePaymentStore.getState().setMerchantUid(merchantUidFromQuery);
    }

    if (!effectiveImpUid || !effectiveMerchantUid || hasProcessed || donationId)
      return;

    alert(`문제가 발생: ${impUid}, ${merchantUid}, ${effectiveImpUid}, ${effectiveMerchantUid}, ${impUidFromQuery}, ${merchantUidFromQuery}, ${hasProcessed}, ${donationId}`)

    if (
      !selectedFundingId ||
      selectedAmount === null ||
      !selectedPaymentMethod
    ) {
      console.error("결제 정보가 누락되었습니다.");
      return;
    }

    const createDonation = async () => {
      try {
        const donationResponse = await createDonationFnRef.current.mutateAsync({
          fundingId: selectedFundingId,
          amount: selectedAmount,
          point: 0,
        });

        alert(`문제가 발생: ${donationResponse}`)

        alert(`문제가 발생: ${donationResponse}`)

        if (donationResponse?.data?.id) {
          setDonationId(donationResponse.data.id);
        } else {
          console.error("기부 생성 실패");
        }
      } catch (error) {
        console.error("기부 생성 중 오류", error);
        setHasProcessed(false);
      }
    };

    createDonation();
  }, [
    effectiveImpUid,
    effectiveMerchantUid,
    hasProcessed,
    donationId,
    selectedFundingId,
    selectedAmount,
    selectedPaymentMethod,
    impUid,
    merchantUid,
    impUidFromQuery,
    merchantUidFromQuery
  ]);

  useEffect(() => {
    if (!donationId || hasProcessed) return;

    const createPayment = async () => {
      try {
        await new Promise((r) => setTimeout(r, 500));

        const paymentCreateData = {
          donationId,
          amount: selectedAmount!,
          points: 0,
          transactionId: effectiveImpUid ?? "",
          paymentMethod: selectedPaymentMethod!,
          status: "COMPLETED",
          merchantUid: effectiveMerchantUid ?? "",
          gatewayProvider:
            selectedPaymentMethod === "KAKAO_PAY" ? "kakaopay" : "tosspay",
          impUid: effectiveImpUid ?? "",
        };

        const paymentResponse = await createPaymentFnRef.current.mutateAsync(
          paymentCreateData
        );

        alert(`문제가 발생: ${paymentResponse}`)

        alert(`문제가 발생: ${paymentResponse}`)

        if (paymentResponse) {
          setHasProcessed(true);
          resetPaymentStore();
          setTimeout(() => {
            router.push(`/donation/complete/${selectedFundingId}`);
          }, 2000);
          setTimeout(() => {
            router.push(`/donation/complete/${selectedFundingId}`);
          }, 2000);
        } else {
          console.error("결제 생성 실패");
        }
      } catch (error) {
        console.error("결제 저장 중 에러 발생:", error);
      }
    };

    createPayment();
  }, [
    donationId,
    hasProcessed,
    selectedAmount,
    selectedPaymentMethod,
    effectiveImpUid,
    effectiveMerchantUid,
    resetPaymentStore,
    router,
    selectedFundingId,
  ]);

  return (
    <>
      <BackButton />
      <div className="flex flex-col h-[40vh] justify-center items-center gap-8">
        <Image
          src="/assets/images/load.gif"
          alt="Loading"
          width="100"
          height="100"
        />
        <div className="flex flex-col justify-center items-center gap-1 text-secondary font-semibold ">
          <span className="text-lg">당신의 마음이 전달되고 있습니다.</span>
          <span className="text-md">잠시만 기다려주세요.</span>
        </div>
      </div>
    </>
  );
};

export default DonationLoadingPage;
