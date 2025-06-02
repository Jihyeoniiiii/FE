// components/profile/EditProfileModal.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface EditProfileModalProps {
  tempForm: {
    name: string;
    preview: string;
    file: File | "";
  };
  onClose: () => void;
  onConfirm: () => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  isPending: boolean;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  tempForm,
  isPending,
  errorMessage,
  onClose,
  onConfirm,
  onNameChange,
  onFileChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
  }, [tempForm, isPending, errorMessage, onClose]);
  if (errorMessage) {
    return (
      <div className="absolute inset-0 bg-black/30 z-50 flex items-center justify-center transition-opacity duration-300 ">
        <div className="flex flex-col justify-center items-center bg-white rounded-2xl space-y-6 p-6 ">
          <div className=" text-red-500 text-baseline ">{errorMessage}</div>
          <Button
            className="w-34 h-7 bg-gray-100 rounded-2xl text-black"
            onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 bg-black/30 z-50 flex items-center justify-center transition-opacity duration-300 ">
      <div className="flex flex-col justify-center items-center bg-white rounded-2xl p-3 space-y-6 pt-6">
        <div
          className="w-[100px] h-[100px] cursor-pointer relative"
          onClick={handleImageClick}>
          <Image
            key={tempForm.preview}
            src={tempForm.preview || "/assets/icons/man-profile.png"}
            alt="프로필"
            width={100}
            height={100}
            className="rounded-full object-cover w-full h-full"
          />
          <div
            className="absolute bottom-1 right-8 bg-white rounded-full p-1 cursor-pointer transform translate-x-1/2 translate-y-1/2 z-50"
            onClick={handleImageClick}>
            <FaCirclePlus className="text-gray text-lg" />
          </div>
        </div>

        <input
          name="profileImage"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: "none" }}
        />

        <div className="relative">
          <input
            name="myname"
            type="text"
            placeholder="이름"
            value={tempForm.name}
            onChange={onNameChange}
            className="text-center text-sm text-secondary m-1 bg-transparent border-none outline-none w-fit"
            style={{ color: "var(--color-secondary)" }}
          />
          <div className="absolute bottom-0 left-0 w-full h-[0.7px] bg-gray" />
        </div>

        <div className="flex justify-end m-2 gap-3">
          <Button
            className="w-34 h-7 bg-gray-100 rounded-2xl text-black"
            onClick={onConfirm}
            disabled={isPending}>
            {isPending ? "업로드 중..." : "확인"}
          </Button>
          <Button
            className="w-34 h-7 bg-gray-100 rounded-2xl text-black"
            onClick={onClose}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
