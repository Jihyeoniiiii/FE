import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import PaymentCard from "@/components/profile/PaymentCard";
import { myDonationList } from "@/lib/myDonationList";
import MyDonationList from "@/components/profile/MyDonationList";

export default function DonatorProfilePage() {
  return (
    <>
      <div className="flex pl-6">
        <Link href={"/profile/recipient"}>
          <Button
            variant="ghost"
            className="w-33 h-9 rounded-2xl text-base text-secondary opacity-80 mt-8 ">
            수혜자 등록
          </Button>
        </Link>
      </div>
      <div className="flex flex-col px-4 max-h-[90vh] overflow-y-scroll scrollbar-none">
        <div className="flex flex-col justify-center items-center p-5">
          <Image
            height={100}
            width={130}
            src="/assets/icons/man-profile.png"
            alt="남자 프로필"
          />
          <h3 className="text-lg text-secondary pt-5"> 김민상</h3>
          <p className="text-sm text-secondary">abc123@gmail.com</p>
        </div>
        <div className="space-y-5">
          <PaymentCard text="이번 달 총 기부 금액" payment={258105} />
          <PaymentCard text="올해 총 기부 금액" payment={258105} />
        </div>
        <div className="flex justify-end m-4">
          <Button className="w-34 h-7 rounded-2xl text-white">
            환급액 계산하기
            <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
          </Button>
        </div>
        <div className="mx-4 ">
          <div className="flex justify-between items-center pb-6">
            <h1 className="text-lg font-semibold opacity-80">전체 기부내역</h1>
            <Link href={"/profile/donationhistory"}>
              <Image
                height={20}
                width={20}
                alt="돋보기"
                src="/assets/icons/search.svg"
              />
            </Link>
          </div>
          <div className="space-y-3">
            {myDonationList.map((myDonation) => (
              <MyDonationList donation={myDonation} key={myDonation.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
