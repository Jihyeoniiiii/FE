"use client"

import ImageUpload from "@/components/funding/ImageUpload";
import RecipientConfirmModal from "@/components/profile/recipient/RecipientConfirmModal";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";

const RecipientRegisterPage = () => {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [image, setImage] = useState("");
  const [activeModal, setActiveModal] = useState(false);

  const handleSubmit = () => {
    if (selectedDocument && image) {
      console.log(`선택된 서류: ${selectedDocument}, 첨부 이미지 URL: ${image}`);
      setActiveModal(true);
    } else if (!selectedDocument) {
      alert("서류를 선택해주세요.");
    } else if (!image) {
      alert("서류 이미지를 첨부해주세요.");
    }
  };

  const handleCloseModal = () => {
    setActiveModal(false);
  }

  return (
    <>
    <div className="flex flex-col h-screen items-center gap-11 py-25 text-secondary">
      <span className="text-[26px]">수혜자 등록</span>
      <div className="flex flex-col w-[80%] h-[50vh] rounded-2xl bg-white gap-8 p-12 text-sm">
        <div>
        <span className="flex">수혜자 등록을 위해 둘 중</span>
        <span>한 가지 서류를 선택해 등록해주세요.</span>
        </div>
        <RadioGroup value={selectedDocument} onValueChange={(value) => setSelectedDocument(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="차상위계층 확인서" id="certificate1" />
            <div className="flex flex-col">
            <Label htmlFor="차상위계층 확인서">차상위계층 확인서</Label>
            <span>(주민센터 발급)</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="기초생활수급자 증명서" id="certificate2" />
            <div className="flex flex-col">
            <Label htmlFor="기초생활수급자 증명서">기초생활수급자 증명서</Label>
            <span>(주민센터 또는 정부24 발급)</span>
            </div>
          </div>
        </RadioGroup>
        <div className="flex justify-center items-center py-1">
          <ImageUpload type="soft" setImageUrl={(url: string) => setImage(url)}/>
        </div>
      </div>
      <Button onClick={handleSubmit} disabled={!selectedDocument || !image} size="none" className="w-[80%] text-md py-3 rounded-2xl">
        등록하기
      </Button>
    </div>
    {activeModal && <RecipientConfirmModal onClose={handleCloseModal} />}
  </>
  );
};

export default RecipientRegisterPage;
