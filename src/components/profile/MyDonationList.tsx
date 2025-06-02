import { formatDonationDateFromString } from "@/utils/dateUtils";
import Image from "next/image";
import React from "react";

interface ImageDetails {
  fileUrl: string;
  fileSize: number;
  contentType: string;
}
export interface Donation {
  id: number;
  title: string;
  createdAt: string;
  amount: number;
  image: ImageDetails;
}

interface DonationProps {
  donation: Donation;
}

const MyDonationList = ({ donation }: DonationProps) => {
  return (
    <div className="flex items-center gap-3 overflow-hidden">
      <Image
        height={30}
        width={60}
        alt={`donation-${donation.title}`}
        src={donation.image.fileUrl}
        style={{ objectFit: "cover" }}
        className="rounded-xl flex-shrink-0"
      />
      <div className="flex justify-between w-full items-center">
        <div className="truncate">
          <h4 className="text-sm text-secondary truncate max-w-[140px]">
            {donation.title}
          </h4>
          <p className="text-xs text-gray">
            {formatDonationDateFromString(donation.createdAt)}
          </p>
        </div>
        <p className="text-sm text-secondary whitespace-nowrap">
          {donation.amount.toLocaleString("ko-KR")}
          <span>원</span>
        </p>
      </div>
    </div>
  );
};

export default MyDonationList;
