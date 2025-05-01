"use client";

import BackButton from "@/components/BackButton";
import ImageUpload from "@/components/funding/ImageUpload";
import RegisterConfirmModal from "@/components/funding/RegisterConfirmModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const FundingWritePage = () => {
  const [formData, setFormData] = useState<{
    title: string;
    imageUrl: string;
    purchaseLink: string;
    address: string;
    content: string;
    isRegister: boolean;
  }>({
    title: "",
    imageUrl: "",
    purchaseLink: "",
    address: "",
    content: "",
    isRegister: false,
  });

  const [isRegister, setIsRegister] = useState(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.imageUrl ||
      !formData.purchaseLink ||
      !formData.address ||
      !formData.content
    ) {
      alert("모든 입력칸을 채워주세요!");
      return;
    }

    setIsRegister(true);
  };

  const handleCloseModal = () => {
    setIsRegister(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      imageUrl: "",
      purchaseLink: "",
      address: "",
      content: "",
      isRegister: false,
    });
  };

  return (
    <div className="h-screen">
      <BackButton />
      <div className="flex flex-col min-h-[calc(100vh-4rem)] p-2 justify-center items-center gap-5 pb-[6rem]">
        <Input
          type="text"
          size="lg"
          placeholder="제목을 입력해주세요"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
        />
        <ImageUpload
          setImageUrl={(url: string) =>
            setFormData((prev) => ({ ...prev, imageUrl: url }))
          }
          text="사진 첨부"
        />
        <Input
          type="text"
          size="sm"
          placeholder="물품 구매 링크"
          name="purchaseLink"
          value={formData.purchaseLink}
          onChange={handleFormChange}
        />
        <Input
          type="text"
          size="sm"
          placeholder="주소지 입력"
          name="address"
          value={formData.address}
          onChange={handleFormChange}
        />
        <Textarea
          placeholder="내용"
          className="bg-white rounded-xl text-sm w-[85%] h-50 border-none"
          name="content"
          value={formData.content}
          onChange={handleFormChange}
        />
        <Button variant="soft" size="xl" onClick={handleSubmit}>
          <span className="text-secondary font-semibold text-[17px]">
            마음 나눠받기
          </span>
        </Button>
        {isRegister && <RegisterConfirmModal onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default FundingWritePage;
