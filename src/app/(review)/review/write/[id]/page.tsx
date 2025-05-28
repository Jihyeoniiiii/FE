"use client";

import BackButton from "@/components/BackButton";
import ImageUpload from "@/components/funding/ImageUpload";
import ReviewCard from "@/components/funding/ReviewCard";
import ListContainer from "@/components/profile/ListContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useReview } from "@/hooks/useReview";
import { CreateReviewData } from "@/lib/api/review";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const ReviewWritePage = () => {
  const [formData, setFormData] = useState<CreateReviewData>({
    title: "",
    imageUrls: [],
    content: "",
  });
  const router = useRouter();
  const { createReviewMutation } = useReview();
  const params = useParams();
  const fundingIdString = typeof params.id === 'string' ? params.id : undefined;
  const fundingId = fundingIdString ? parseInt(fundingIdString, 10) : undefined;

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
    if (!formData.title || !formData.imageUrls || !formData.content) {
      alert("모든 입력칸을 채워주세요!");
      return;
    }

    createReviewMutation.mutate({ fundingId: fundingId, reviewData: formData }, {
      onSuccess: () => {
        try {
          router.push("/profile/recipient");
          console.log(formData)
        } catch (error) {
          console.error("리뷰 생성 데이터 갱신 중 오류 발생:", error);
        }
      },
      onError: (error) => {
        console.log(formData);
        console.error("리뷰 생성 중 오류 발생:", error);
      },
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

  return (
    <>
      <BackButton>후기 작성</BackButton>
      <div className="justify-center px-25 sm:px-35 md:px-55 py-1">
        <ReviewCard reviewData={formData} fundingId={fundingId} />
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
              setImageUrl={handleImageUploadSuccess}
              module="review"
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
