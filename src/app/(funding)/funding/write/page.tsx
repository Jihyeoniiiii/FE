"use client";

import BackButton from "@/components/BackButton";
import ImageUpload from "@/components/funding/ImageUpload";
import RegisterConfirmModal from "@/components/funding/RegisterConfirmModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateFundingData } from "@/lib/api/funding";
import React, { useState, useRef } from "react"; // useRef 훅 추가
import { MdDateRange } from "react-icons/md";

const FundingWritePage = () => {
  const [formData, setFormData] = useState<CreateFundingData>({
    title: "",
    content: "",
    imageUrls: [],
    itemLink: "",
    address: "",
    goalAmount: 0,
    endDate: new Date().toISOString().slice(0, 10),
  });
  const [isRegister, setIsRegister] = useState(false);

  const endDateInputRef = useRef<HTMLInputElement>(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name === "goalAmount") {
        const parsedValue = parseInt(value, 10);
        return {
          ...prevData,
          [name]: isNaN(parsedValue) ? 0 : parsedValue,
        };
      } else if (name === "endDate") {
        return { ...prevData, [name]: value };
      } else {
        return { ...prevData, [name]: value };
      }
    });
  };

  const handleImageUploadSuccess = (imageUrl: string) => {
    setFormData((prevData) => ({
      ...prevData,
      imageUrls: prevData.imageUrls
        ? [...prevData.imageUrls, imageUrl]
        : [imageUrl],
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.imageUrls ||
      !formData.itemLink ||
      !formData.address ||
      !formData.content ||
      formData.goalAmount <= 0 ||
      !formData.endDate
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
      content: "",
      imageUrls: [],
      itemLink: "",
      address: "",
      goalAmount: 0,
      endDate: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <div className="h-screen">
      <BackButton />
      <div className="flex flex-col w-full px-2 justify-center items-center gap-4 py-4">
        <Input
          type="text"
          size="lg"
          placeholder="제목을 입력해주세요"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
        />
        <ImageUpload
          setImageUrl={handleImageUploadSuccess}
          module="funding"
          text="사진 첨부"
        />
        <Input
          type="text"
          size="sm"
          placeholder="물품 구매 링크"
          name="itemLink"
          value={formData.itemLink}
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
        <div className="flex justify-center items-center gap-2 text-xs text-secondary opacity-80">
          <div className="flex flex-col gap-1 w-40">
            <span className="flex px-1">펀딩 마감일</span>
            <div className="relative flex items-center">
              <Input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleFormChange}
                className="h-10 pr-8" 
                ref={endDateInputRef} 
              />
              <MdDateRange
                className="absolute right-2 cursor-pointer text-gray-500" 
                size={25} // 아이콘 크기
                onClick={() => endDateInputRef.current?.showPicker()} 
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-37">
            <span className="flex px-3">가격</span>
            <div className="flex justify-center items-center">
              <Input
                type="number"
                size="sm"
                placeholder="가격"
                name="goalAmount"
                value={formData.goalAmount}
                onChange={handleFormChange}
                className="h-10"
              />
            </div>
          </div>
        </div>
        <Textarea
          placeholder="내용"
          className="bg-white rounded-xl text-sm w-[85%] h-40 border-none"
          name="content"
          value={formData.content}
          onChange={handleFormChange}
        />
        <Button variant="soft" size="xl" onClick={handleSubmit}>
          <span className="text-secondary font-semibold text-[17px]">
            마음 나눠받기
          </span>
        </Button>
        {isRegister && (
          <RegisterConfirmModal
            onClose={handleCloseModal}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
};

export default FundingWritePage;
