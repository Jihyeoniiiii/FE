"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PaymentCard from "@/components/profile/PaymentCard";
import MyDonationList, { Donation } from "@/components/profile/MyDonationList";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { patchUserProfile, uploadProfileImage } from "@/lib/api/profile";
import EditProfileModal from "@/components/profile/EditProfileModal";
import { debounce } from "@/lib/debounce";
import { useMemberData } from "@/lib/userData";

export default function DonatorProfilePage() {
  const setUserData = userStore((state) => state.setUserData);
  const waiting = userStore((state) => state.waiting);
  const router = useRouter();
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    data: userInfo,
    isPending: isUserDataPending,
    isError: isUserDataError,
  } = useMemberData();

  const [profileForm, setProfileForm] = useState<{
    name: string;
    selectedFile: File | "";
  }>({
    name: "",
    selectedFile: "",
  });

  const [tempForm, setTempForm] = useState<{
    name: string;
    preview: string;
    file: File | "";
  }>({
    name: userInfo?.name || "",
    preview:
      userInfo?.profileImage && userInfo.profileImage !== "null"
        ? userInfo.profileImage
        : "/assets/icons/woman-profile.png",
    file: "",
  });

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const { mutate: UploadImage, isPending } = useMutation({
    mutationFn: async (file: File | string) => {
      const uploadname = profileForm.name || userInfo?.name || "";

      if (file instanceof File) {
        // 새 이미지 업로드가 필요한 경우
        const imageUrl = await uploadProfileImage(file);
        return await patchUserProfile({
          name: uploadname,
          profileImage: imageUrl,
        });
      }

      // 기존 이미지 URL만 사용하는 경우
      return await patchUserProfile({
        name: uploadname,
        profileImage: userInfo?.profileImage, // 이 경우 file은 string
      });
    },
    onError: (error) => {
      console.error("업로드 에러:", error);
      setErrorMessage("파일 업로드에 실패했습니다. 다시 시도 해주세요.");
    },
    onSuccess: () => {
      setErrorMessage("");

      setTempForm((prev) => ({
        ...prev,
        name: tempForm.name,
        file: tempForm.file,
      }));
    },
  });

  const handleTempNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이름 입력 받을때 2초에 1번씩만 저장하기
    setTempForm((prev) => ({ ...prev, name: e.target.value }));

    debounce(() => {}, 2000, timerIdRef);
  };

  const handleTempFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 사진 받아서 상태관리리하는 함수
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setTempForm({
          name: tempForm.name,
          preview: reader.result as string,
          file,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    //모달 안에 있는 전송 버튼누르면 api 통신하는 함수수
    UploadImage(tempForm.file);

    setUserData({
      ...userInfo!,
      name: tempForm.name,
      profileImage: tempForm.preview,
    });

    setProfileForm({
      name: tempForm.name,
      selectedFile: tempForm.file,
    });

    setPreview(tempForm.preview);
    setIsOpen(false);
  };

  const handleCancel = () => {
    // 모달안에 있는 취소 버튼
    setProfileForm({
      name: "",
      selectedFile: "",
    });
    setIsOpen(false);
  };
  const handleErrorCancel = () => {
    setIsErrorOpen(false);
    router.back();
  };
  useEffect(() => {
    const currentTimerId = timerIdRef.current; // 현재 값 복사

    return () => {
      if (currentTimerId) {
        clearTimeout(currentTimerId);
      }
    };
  }, []);

  const handleToRecipientButton = () => {
    // 수혜자 권한 허가를 기다리는 중인지 체크
    if (!waiting) {
      // 아니라면 원래대로 수혜자 등록하는 페이지로 이동
      router.push("/profile/recipient/register");
    } else {
      // 기다리는 중이라면 수혜자 등록 완료 페이지로 이동하도록
      router.push("/profile/recipient/complete");
    }
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
    <>
      <div className="flex pl-6 mb-5">
        <Button
          variant="ghost"
          onClick={handleToRecipientButton}
          className="w-33 h-9 rounded-2xl text-base text-secondary opacity-80 mt-8 ">
          수혜자 등록
        </Button>
      </div>

      <div className="flex flex-col px-4 max-h-[90vh] overflow-y-scroll scrollbar-none">
        <div className="flex flex-col justify-center items-center p-2">
          <div className="w-[100px] h-[100px] relative">
            <Image
              width={100}
              height={100}
              src={
                preview ||
                (userInfo.profileImage && userInfo.profileImage !== "null"
                  ? userInfo.profileImage
                  : "/assets/icons/woman-profile.png")
              }
              alt="프로필"
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <h3 className="text-baseline text-secondary pt-2">
            {profileForm.name === "" ? userInfo.name : profileForm.name}
          </h3>
          <p className="text-sm text-secondary">{userInfo.email}</p>
        </div>
        <div className="flex justify-between my-3">
          <Button
            className="w-34 h-7 bg-gray-100 rounded-2xl text-black ml-5"
            onClick={handleOpenModal}>
            프로필 편집
          </Button>
          <Button
            className="w-34 h-7 rounded-2xl text-white mr-5"
            onClick={() => router.push("/refund")}>
            환급액 계산
          </Button>
        </div>
        <div className="space-y-5 my-2">
          <PaymentCard
            text="이번 달 총 기부 금액"
            payment={userInfo.monthlyAmount}
          />
          <PaymentCard
            text="올해 총 기부 금액"
            payment={userInfo.yearlyAmount}
          />
        </div>

        <div className="my-3 mx-5 ">
          <div className="flex justify-between items-center pb-6">
            <h1 className="text-lg font-semibold opacity-80">전체 기부내역</h1>
            <Link href={"/profile/donationhistory"}>
              <Image
                height={20}
                width={20}
                alt="돋보기"
                src="/assets/icons/search.svg"
                className="hidden" // 지금은 안보이도록 하고 나중을 위해 남겨둠
              />
            </Link>
          </div>
          <div className="space-y-3">
            {userInfo.donations.length !== 0 ? (
              userInfo.donations.map((myDonation: Donation) => (
                <MyDonationList donation={myDonation} key={myDonation.id} />
              ))
            ) : (
              <p className="text-start text-gray-500">
                진행중인 펀드가 없습니다.
              </p>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <EditProfileModal
          tempForm={tempForm}
          isPending={isPending}
          errorMessage={errorMessage}
          onClose={handleCancel}
          onConfirm={handleConfirm}
          onNameChange={handleTempNameChange}
          onFileChange={handleTempFileChange}
        />
      )}
    </>
  );
}
