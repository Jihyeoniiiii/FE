import React, { Suspense } from "react";
import DonationLoadingClient from "@/components/DonationLodaingClient";

const DonationLoadingPage = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <DonationLoadingClient />
    </Suspense>
  );
};

export default DonationLoadingPage;
