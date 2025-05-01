"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/Dropdown";
import { getDeductionRate } from "@/utils/taxUtils";

const RefundCalculatePage = () => {
  const donorTypeOptions = ["개인", "사업자"];
  const router = useRouter();

  const [donationAmount, setDonationAmount] = useState("");
  const [donorType, setDonorType] = useState("");
  const isCalculateButtonDisabled = !donorType || !donationAmount;

  const handleDonationAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(e.target.value);
  };

  const handleDonorTypeSelect = (value: string) => {
    setDonorType(value);
  };

  const handleCalculate = () => {
    const donation = parseInt(donationAmount);
    const deductionRateOrNull = getDeductionRate(donorType, isNaN(donation) ? 0 : donation);
    let deductRate = 0;
  
    if (deductionRateOrNull !== null) {
      deductRate = deductionRateOrNull / 100;
    } else {
      console.error("공제율을 가져오는데 실패했습니다.");
      return;
    }
  
    if (!isCalculateButtonDisabled && !isNaN(donation)) {
      const calculatedDeduction = donation * deductRate;
      router.push(`/refund/result?deduction=${Math.round(calculatedDeduction)}`);
    } else {
      alert("기부 금액, 기부자 유형을 입력/선택해주세요.");
    }
  };

  return (
    <>
      <BackButton />
      <div className="flex flex-col px-17 h-[78vh] justify-center gap-15 text-secondary">
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-semibold">세금 공제 계산기</div>
          <div className="flex flex-col gap-1">
            <div className="text-xs">
              본인의 기부금에 대한 세액공제를 받을 수 있습니다.
            </div>
            <div className="text-xs">예상 환급액을 간단히 계산해보세요!</div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <span>올해 총 기부 금액</span>
          <div className="relative flex items-center">
            <Input
              className="w-full"
              value={donationAmount}
              onChange={handleDonationAmountChange}
            />
            <span className="absolute right-2 text-sm text-muted-foreground">
              원
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full relative gap-2">
          <span>기부자 유형</span>
          <Dropdown
            options={donorTypeOptions}
            onSelect={handleDonorTypeSelect}
          >
            기부자 유형을 선택하세요
          </Dropdown>
        </div>
        <Button className="py-5 mt-6" onClick={handleCalculate} disabled={isCalculateButtonDisabled}>
          계산하기
        </Button>
      </div>
    </>
  );
};

export default RefundCalculatePage;
