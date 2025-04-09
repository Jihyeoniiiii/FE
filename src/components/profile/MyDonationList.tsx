import { formatDonationDate } from "@/utils/dateUtils";
import Image from "next/image";
import React from "react";

type Donation = {
  id: string;
  title: string;
  date: Date;
  fundingPayment: number;
  photo: string;
};

type DonationProps = {
  donation: Donation;
};

const MyDonationList = ({ donation }: DonationProps) => {
  return (
    <div className="flex items-center gap-3 overflow-hidden">
      <Image
        height={30}
        width={60}
        alt="studying"
        src="/assets/images/study.png"
        className="rounded-xl flex-shrink-0"
      />
      <div className="flex justify-between w-full items-center">
        <div className="truncate">
          <h4 className="text-sm text-secondary truncate max-w-[140px]">
            {donation.title}
          </h4>
          <p className="text-xs text-gray">
            {" "}
            {formatDonationDate(donation.date)}
          </p>
        </div>
        <p className="text-sm text-secondary whitespace-nowrap">
          {donation.fundingPayment.toLocaleString("ko-KR")}
          <span>원</span>
        </p>
      </div>
    </div>
  );
};



export default MyDonationList;
