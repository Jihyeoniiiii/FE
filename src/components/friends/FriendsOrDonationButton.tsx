import React from "react";
import { Button } from "../ui/button";
import { Heart, UsersRound } from "lucide-react";

type FriendsOrDonationButtonProps = {
  isFriendsListOpen: boolean;
  setIsFriendsListOpen: (open: boolean) => void;
  isCommonDonationListOpen: boolean;
  setIsCommonDonationListOpen: (open: boolean) => void;
};

const FriendsOrDonationButton = ({
  isFriendsListOpen,
  setIsFriendsListOpen,
  isCommonDonationListOpen,
  setIsCommonDonationListOpen,
}: FriendsOrDonationButtonProps) => {
  return (
    <div className="px-4 py-3 md:px-12 mb-6">
      <div className="h-[6vh] bg-white rounded-full flex overflow-hidden w-full max-w-md mx-auto">
        <Button
          className={`h-[5vh] flex-1 rounded-full text-md border-none m-1 py-2 px-4 ${
            isFriendsListOpen
              ? "bg-primary opacity-80 text-white shadow-xs hover:bg-primary/80 text-white"
              : "bg-white-gradient hover:bg-gray-200 text-secondary"
          }`}
          onClick={() => {
            setIsFriendsListOpen(true);
            setIsCommonDonationListOpen(false);
          }}>
          <UsersRound className="mr-2 h-5 w-5" />
          전체 친구
        </Button>
        <Button
          className={`h-[5vh] flex-1 rounded-full text-md border-none m-1 py-2 px-4 ${
            isCommonDonationListOpen
              ? "bg-primary opacity-80 text-white shadow-xs hover:bg-primary/80 text-white"
              : "bg-white-gradient hover:bg-gray-200 text-secondary"
          }`}
          onClick={() => {
            setIsFriendsListOpen(false);
            setIsCommonDonationListOpen(true);
          }}>
          <Heart className="mr-2 h-5 w-5" />
          함께한 기부
        </Button>
      </div>
    </div>
  );
};

export default FriendsOrDonationButton;
