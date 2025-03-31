import BackButton from "@/components/BackButton";
import PointContainer from "@/components/payment/PointContainer";
import SelectAmount from "@/components/payment/SelectAmount";
import SelectPayMethod from "@/components/payment/SelectPayMethod";
import { Button } from "@/components/ui/button";
import React from "react";

const PaymentPage = () => {
  return (
    <>
    <BackButton />
    <div className="flex flex-col gap-11">
      <span className="flex justify-center items-center text-2xl font-semibold">마음 나누기</span>
      <SelectAmount />
      <PointContainer />
      <SelectPayMethod />
      <div className="flex justify-center items-center">
        <Button size="xl" className="text-secondary text-lg text-white font-semibold">
          마음 나누기
        </Button>
      </div>
    </div>
    </>
  );
};

export default PaymentPage;
