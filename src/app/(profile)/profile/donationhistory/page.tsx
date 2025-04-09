"use client";

import BackButton from "@/components/BackButton";
import { myDonationList } from "@/lib/myDonationList";
import MyDonationList from "@/components/profile/MyDonationList";
import SearchBar from "@/components/SearchBar";
import DateSearchModal from "@/components/donationhistory/DateSearchModal";


export default function DonationHistorypage() {
  return (
    <>
      <BackButton />
      {/* Header */}
      <div className="px-10">
        {" "}
        <div className="py-3 flex justify-center items-center">
          <SearchBar placeholdertext="필터 제목, 금액으로 검색" />
        </div>
        {/* Filter */}
        <div className=" py-2">
          <DateSearchModal />
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
    </>
  );
}

