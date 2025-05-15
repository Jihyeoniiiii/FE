"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PaymentCard from "@/components/profile/PaymentCard";
import { myDonationList } from "@/lib/myDonationList";
import MyDonationList from "@/components/profile/MyDonationList";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { patchUserProfile, uploadProfileImage } from "@/lib/profile";
import EditProfileModal from "@/components/profile/EditProfileModal";
import { debounce } from "@/lib/debounce";

export default function DonatorProfilePage() {
  const userData = userStore((state) => state.userData);
  const setUserData = userStore((state) => state.setUserData);
  const router = useRouter();
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [profileForm, setProfileForm] = useState<{
    name: string;
    selectedFile: File | "";
  }>({
    name: "",
    selectedFile: "",
  });

  const [tempForm, setTempForm] = useState({
    name: "",
    preview: "",
    file: "" as File | "",
  });

  const handleOpenModal = () => {
    setTempForm({
      name: userData?.name || "",
      preview:
        userData?.profileImage && userData.profileImage !== "null"
          ? userData.profileImage
          : "/assets/icons/woman-profile.png",
      file: "",
    });
    setIsOpen(true);
  };

  const { mutate: UploadImage, isPending } = useMutation({
    mutationFn: async (file: File | string) => {
      const uploadname = profileForm.name || userData?.name || "";

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
        profileImage: userData?.profileImage, // 이 경우 file은 string
      });
    },
    onError: (error) => {
      console.error("업로드 에러:", error);
      setErrorMessage("파일 업로드에 실패했습니다. 다시 시도 해주세요.");
    },
    onSuccess: () => {
      setErrorMessage("");
    },
  });

  const handleTempNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempForm((prev) => ({ ...prev, name: e.target.value }));
    debounce(
      () => {
        console.log("Debounced input:", e.target.value);
      },
      2000,
      timerIdRef
    );
  };

  const handleTempFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setTempForm((prev) => ({
          ...prev,
          preview: reader.result as string,
          file,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    UploadImage(tempForm.file);

    setUserData({
      ...userData!,
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
    setProfileForm({
      name: "",
      selectedFile: "",
    });
    setIsOpen(false);
  };



  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, [setUserData]); // setUserData 의존성 추가

  if (!userData) {
    return <div>페이지 정보를 불러오는 중입니다.</div>;
  }

  return (
    <>
      <div className="flex pl-6">
        <Link href={"/profile/recipient/register"}>
          <Button
            variant="ghost"
            className="w-33 h-9 rounded-2xl text-base text-secondary opacity-80 mt-8 ">
            수혜자 등록
          </Button>
        </Link>
      </div>

      <div className="flex flex-col px-4 max-h-[90vh] overflow-y-scroll scrollbar-none">
        <div className="flex flex-col justify-center items-center p-2">
          <div className="w-[100px] h-[100px] relative">
            <Image
              width={100}
              height={100}
              src={
                preview ||
                (userData.profileImage && userData.profileImage !== "null"
                  ? userData.profileImage
                  : "/assets/icons/woman-profile.png")
              }
              alt="프로필"
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <h3 className="text-baseline text-secondary pt-2">
            {profileForm.name === "" ? userData.name : profileForm.name}
          </h3>
          <p className="text-sm text-secondary">{userData.email}</p>
        </div>
        <div className="flex justify-between m-2">
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
        <div className="space-y-5">
          <PaymentCard
            text="이번 달 총 기부 금액"
            payment={userData.monthlyAmount}
          />
          <PaymentCard
            text="올해 총 기부 금액"
            payment={userData.yearlyAmount}
          />
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
