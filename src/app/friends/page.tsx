"use client";

import BackButton from "@/components/BackButton";
import FriendDonationCard from "@/components/friends/FriendDonationCard";
import FriendListCard from "@/components/friends/FriendListCard";
import FriendPageHeader from "@/components/friends/FriendPageHeader";
import FriendsOrDonationButton from "@/components/friends/FriendsOrDonationButton";
import { friendDonations, friendsList } from "@/lib/friendsSampleData";
import { useState } from "react";

export default function FriendsPage() {
  const [isFriendsListOpen, setIsFriendsListOpen] = useState<boolean>(true);
  const [isCommonDonationListOpen, setIsCommonDonationListOpen] =
    useState<boolean>(false);

  return (
    <>
      <BackButton />
      <div className="flex flex-col px-8 py-4 md:p-15">
        {/* 헤더 */}
        <FriendPageHeader />

        {/* 버튼 필터 영역 */}
        <FriendsOrDonationButton
          isFriendsListOpen={isFriendsListOpen}
          setIsFriendsListOpen={setIsFriendsListOpen}
          isCommonDonationListOpen={isCommonDonationListOpen}
          setIsCommonDonationListOpen={setIsCommonDonationListOpen}
        />

        <div className="h-[58vh] bg-background border-3 border-white rounded-2xl p-2 mx-4 md:mx-10">
          {isFriendsListOpen &&
            friendsList.map((friend) => (
              <FriendListCard
                key={friend.id}
                id={friend.id}
                name={friend.name}
                badge={friend.badge}
                commondonation={friend.commondonation}
                profile_img={friend.profile_img}
              />
            ))}
          {isCommonDonationListOpen &&
            friendDonations.map((donation) => {
              return (
                <FriendDonationCard
                  key={donation.id}
                  friendName={donation.friendName}
                  fundingTitle={donation.fundingTitle}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
