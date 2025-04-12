"use client";

import BackButton from "@/components/BackButton";
import { myDonationList } from "@/lib/myDonationList";
import MyDonationList from "@/components/profile/MyDonationList";
import SearchBar from "@/components/SearchBar";
import DateSearchModal from "@/components/donationhistory/DateSearchModal";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export default function DonationHistorypage() {
  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);

  return (
    <>
      <BackButton />
      {/* Header */}
      <div className="px-10">
        <div className="py-3 flex justify-center items-center">
          <SearchBar placeholdertext="필터 제목, 금액으로 검색" />
        </div>
        {/* Filter */}
        <div className=" py-2">
          <button
            className={clsx(StButton, "cursor-pointer")}
            onClick={() => setIsDateModalOpen(true)}>
            최신순 <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        {/* Donation List */}
        <div className="flex-1 max-h-[79vh] overflow-y-scroll scrollbar-none py-4">
          <div className="space-y-7">
            {myDonationList.map((myDonation) => (
              <MyDonationList donation={myDonation} key={myDonation.id} />
            ))}
          </div>
        </div>
      </div>
      {isDateModalOpen && (
        <DateSearchModal
          isDateModalOpen={isDateModalOpen}
          setIsDateModalOpen={setIsDateModalOpen}
        />
      )}
    </>
  );
}
const StButton =
  "flex items-center gap-1 bg-white text-sm text-gray rounded-lg px-2 py-1.5 shadow-sm";
