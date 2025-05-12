"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { FundingData } from "@/lib/api/funding";
import { useFunding } from "@/hooks/useCreateFunding";

interface RegisterConfirmModalProps {
  onClose: () => void;
  formData: FundingData;
}

const RegisterConfirmModal: React.FC<RegisterConfirmModalProps> = ({
  onClose,
  formData,
}) => {
  const router = useRouter();
  const { createFundingMutation } = useFunding();

  const handleRegisterClick = () => {
    const payload = {
      ...formData,
      endDate: formData.endDate + "T23:59:59",
    };

    createFundingMutation.mutate(payload, {
      onSuccess: () => {
        try {
          router.push("/funding/register");
          onClose();
        } catch (error) {
          console.error("펀딩 생성 데이터 갱신 중 오류 발생:", error);
        }
      },
      onError: (error) => {
        console.log(formData);
        console.error("펀딩 생성 중 오류 발생:", error);
      },
    });
  };

  return (
    <div className="flex justify-center items-center fixed bottom-25 w-[85%] h-45 bg-white rounded-2xl drop-shadow-2xl">
      <div className="flex flex-col gap-2">
        <span className="flex justify-center items-center text-lg text-secondary">
          펀딩을 <span className="text-primary px-1.5">등록</span> 하시겠습니까?
        </span>
        <div className="flex flex-col justify-center items-center text-xs text-primary pb-2">
          <span>*술, 담배 등 금지품목에 해당하는 것들은</span>
          <span>등록할 수 없습니다.</span>
        </div>
        <div className="flex justify-center items-center">
          <Button className="text-md" onClick={handleRegisterClick}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterConfirmModal;
