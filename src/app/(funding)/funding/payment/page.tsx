"use client";

import BackButton from "@/components/BackButton";
import PointContainer from "@/components/payment/PointContainer";
import SelectAmount from "@/components/payment/SelectAmount";
import SelectPayMethod from "@/components/payment/SelectPayMethod";
import { Button } from "@/components/ui/button";
import { usePaymentStore } from "@/store/paymentStore";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { initializePortone, requestPortonePayment } from "@/lib/portone";

const PaymentPage = () => {
  const selectedAmount = usePaymentStore((state) => state.selectedAmount);
  const selectedFundingId = usePaymentStore((state) => state.selectedFundingId);
  const selectedPaymentMethod = usePaymentStore(
    (state) => state.selectedPaymentMethod
  );

  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonMessage, setButtonMessage] = useState("마음 나누기");

  const tossPayChannelKey = process.env.NEXT_PUBLIC_TOSSPAY_CHANNEL_KEY;
  const kakaoPayChannelKey = process.env.NEXT_PUBLIC_KAKAOPAY_CHANNEL_KEY;

  const handleFullPaymentProcess = async () => {
    if (
      !selectedFundingId ||
      selectedAmount === null ||
      !selectedPaymentMethod
    ) {
      alert("결제 정보를 먼저 선택해주세요.");
      return;
    }

    const getPayMethod = (method: string): string => {
      if (method === "TOSS_PAY") {
        return "tosspay";
      }
      return "card";
    };

    setIsProcessing(true);
    setButtonMessage("결제 준비 중...");

    const portoneCode = process.env.NEXT_PUBLIC_PORTONE_CODE;
    if (!portoneCode) {
      console.error("아임포트 가맹점 코드를 찾을 수 없습니다.");
      setIsProcessing(false);
      setButtonMessage("마음 나누기");
      return;
    }

    initializePortone(portoneCode);

    const merchantUidForPortone = `donation_${new Date().getTime()}_${selectedFundingId}`;

    try {
      const impResponse = await requestPortonePayment({
        channelKey:
          selectedPaymentMethod === "KAKAO_PAY"
            ? kakaoPayChannelKey!
            : tossPayChannelKey!,
        pay_method: getPayMethod(selectedPaymentMethod),
        merchant_uid: merchantUidForPortone,
        amount: selectedAmount,
        name: "마음 나누기",
        buyer_name: "후원자",
        m_redirect_url:
          process.env.NEXT_PUBLIC_PORTONE_REDIRECT_URL ??
          "https://chaeum.site/donation/loading",
      });

      setButtonMessage("결제 처리 중...");

      if (impResponse && impResponse.success) {
        usePaymentStore.getState().setImpUid(impResponse.imp_uid);
        usePaymentStore.getState().setMerchantUid(merchantUidForPortone);

        router.push(`/donation/loading`);
      } else {
        console.error("결제 실패:", impResponse);
        router.push("/funding");
      }
    } catch (error: unknown) {
      console.error("아임포트 결제 실패 또는 에러 발생:", error);
      router.push("/funding");
    } finally {
      setIsProcessing(false);
      setButtonMessage("마음 나누기");
    }
  };

  return (
    <>
      <BackButton />
      <div className="flex flex-col">
        <div className="flex flex-col gap-12">
          <span className="flex justify-center items-center text-2xl font-semibold">
            마음 나누기
          </span>
          <SelectAmount />
          <PointContainer />
          <SelectPayMethod />
        </div>
        <div className="flex justify-center items-center py-9">
          <Button
            size="xl"
            className="text-secondary text-lg text-white font-semibold"
            onClick={handleFullPaymentProcess}
            disabled={isProcessing}
          >
            {buttonMessage}
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
