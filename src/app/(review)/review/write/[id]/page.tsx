"use client";

import BackButton from "@/components/BackButton";
import ImageUpload from "@/components/funding/ImageUpload";
import ReviewCard from "@/components/funding/ReviewCard";
import ListContainer from "@/components/profile/ListContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const cardData = {
  title: "공부해서 사회에 보답하겠습니다.",
  photo: "/assets/images/study.png",
  id: "1",
};

const ReviewWritePage = () => {
  const [formData, setFormData] = useState<{
    title: string;
    imageUrl: string;
    content: string;
  }>({
    title: "",
    imageUrl: "",
    content: "",
  });
  const router = useRouter();

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
    if (!formData.title || !formData.imageUrl || !formData.content) {
      alert("모든 입력칸을 채워주세요!");
      return;
    }
    router.push("/profile/recipient");
  };

  return (
    <>
      <BackButton>후기 작성</BackButton>
      <div className="justify-center px-25 sm:px-35 md:px-55 py-1">
        <ReviewCard reviewData={cardData} />
      </div>

      <ListContainer>
        <div className="flex flex-col gap-5">
          <div>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="제목을 입력해주세요"
              className="w-full"
            />
            <div className="flex border-[0.5px] border-gray" />
          </div>
          <div className="flex justify-center px-10">
            <ImageUpload
              setImageUrl={(url: string) =>
                setFormData((prev) => ({ ...prev, imageUrl: url }))
              }
              text="사진 첨부"
            />
          </div>
          <Textarea
            placeholder="내용"
            className="bg-white border-gray rounded-xl text-md w-full h-35"
            name="content"
            value={formData.content}
            onChange={handleFormChange}
          />
          <Button
            size="none"
            className="text-white py-2.5"
            onClick={handleSubmit}
          >
            작성 완료
          </Button>
        </div>
      </ListContainer>
    </>
  );
};

export default ReviewWritePage;
