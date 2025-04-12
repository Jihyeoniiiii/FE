import Image from "next/image";
import React from "react";

type FriendDonation = {
  friendName: string;
  fundingTitle: string;
};

const FriendDonationCard = ({ friendName, fundingTitle }: FriendDonation) => {
  return (
    <div className="flex items-center gap-5 p-3 border-b-3 border-white last:border-b-0 md:gap-10">
      <div className="flex items-center">
        <div className="relative w-14 h-10 md:w-20 md:h-2=10">
          <Image
            src="/assets/images/study.png"
            alt={friendName}
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h1 className="text-sm truncate w-[40vw] overflow-hidden whitespace-nowrap text-ellipsis">
          기부 : {fundingTitle}
        </h1>

        <h1 className="text-sm">함께한 친구 : {friendName}</h1>
      </div>
    </div>
  );
};

export default FriendDonationCard;
