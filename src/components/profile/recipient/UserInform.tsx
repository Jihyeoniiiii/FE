"use client";

import { Button } from "@/components/ui/button";
import { useMemberData } from "@/lib/userData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserInform = () => {
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(true);
  const router = useRouter();

  const {
    data: userInfo,
    isPending: isUserDataPending,
    isError: isUserDataError,
  } = useMemberData();

  const handleErrorCancel = () => {
    setIsErrorOpen(false);
    router.back();
  };

  if (isUserDataPending) {
    return <div>페이지 정보를 불러오는 중입니다.</div>;
  }
  if (isUserDataError) {
    return (
      isErrorOpen && (
        <div className="absolute inset-0 bg-black/30 z-50 flex items-center justify-center transition-opacity duration-300 ">
          <div className="flex flex-col justify-center items-center bg-white rounded-2xl space-y-6 p-6 ">
            <div className=" flex text-center text-red-500 text-baseline ">
              회원정보를 불러오는데 실패했습니다.
              <br /> 다시 접속해주세요.
            </div>
            <Button
              className="w-34 h-7 rounded-2xl text-black"
              onClick={handleErrorCancel}>
              닫기
            </Button>
          </div>
        </div>
      )
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-[100px] h-[100px] relative">
          <Image
            width={100}
            height={100}
            src={userInfo.profileImage ?? "/assets/icons/woman-profile.png"}
            alt="프로필"
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col text-secondary opacity-80 justify-center items-center">
          <span>{userInfo.name}</span>
          <span className="text-sm">{userInfo.email}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInform;
