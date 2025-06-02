"use client";

import BackButton from "@/components/BackButton";
import RecipientConfirmModal from "@/components/profile/recipient/RecipientConfirmModal";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OcrRequestData, recipientRegister } from "@/lib/api/ocr";
import { userStore } from "@/store/userStore";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RecipientRegisterPage = () => {
  const setWaiting = userStore((state) => state.setWaiting);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [activeModal, setActiveModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const username = userStore((state) => state.userData?.name);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  const handleSubmit = () => {
    if (selectedDocument && imageFile) {
      // console.log(
      //   `선택된 서류: ${selectedDocument}, 첨부 이미지 URL: ${imageFile}`
      // );
      setActiveModal(true);
    } else if (!selectedDocument) {
      alert("서류를 선택해주세요.");
    } else if (!imageFile) {
      alert("서류 이미지를 첨부해주세요.");
    }

    setIsUploading(true);
  };

  const handleConfirm = async () => {
    const docType = selectedDocument === "차상위계층 확인서" ? "1" : "2";

    const ocrData: OcrRequestData = {
      image: imageFile!,
      name: username || "",
      doc_type: docType,
    };
    try {
      const responseData = await recipientRegister(ocrData); // 분리된 API 함수 호출
      setIsUploading(false);
      setActiveModal(false);
      if (responseData.success) {
        setWaiting(true); // 수혜자 허가 기다리는 중인 상태 전송
        router.push("/profile/recipient/complete");
      } else {
        alert(
          "OCR 서버 요청 중 오류가 발생했습니다. 개발자 콘솔을 확인해주세요."
        );
        setIsUploading(false);
        setActiveModal(false);
      }
    } catch (error) {
      alert(
        "OCR 서버 요청 중 오류가 발생했습니다. 개발자 콘솔을 확인해주세요."
      );
      setIsUploading(false);
      setActiveModal(false);
      throw error;
    } finally {
      setSelectedDocument("");
      setImageFile(null);
    }
  };
  return (
    <>
      <BackButton />
      <div className="flex flex-col h-screen items-center gap-11 py-10 text-secondary">
        <span className="text-[26px]">수혜자 등록</span>
        <div className="flex flex-col w-[80%] h-[50vh] rounded-2xl bg-white gap-8 p-12 text-sm">
          <div>
            <span className="flex">수혜자 등록을 위해 둘 중</span>
            <span>한 가지 서류를 선택해 등록해주세요.</span>
          </div>
          <RadioGroup
            value={selectedDocument}
            onValueChange={(value) => setSelectedDocument(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="기초생활수급자 증명서" id="certificate1" />
              <div className="flex flex-col">
                <Label htmlFor="기초생활수급자 증명서">
                  기초생활수급자 증명서
                </Label>
                <span>(주민센터 또는 정부24 발급)</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="차상위계층 확인서" id="certificate2" />
              <div className="flex flex-col">
                <Label htmlFor="차상위계층 확인서">차상위계층 확인서</Label>
                <span>(주민센터 발급)</span>
              </div>
            </div>
          </RadioGroup>
          <div className="flex justify-center items-center py-1">
            <div>
              <label
                htmlFor="file"
                className="w-45 h-30 cursor-pointer bg-white border-2 border-primary/70 rounded-2xl flex items-center justify-center">
                <span className="text-primary">
                  {imageFile ? "첨부완료" : "서류 이미지 선택"}
                </span>
              </label>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            {isUploading && (
              <span className="text-sm text-muted">서버로 전송 중...</span>
            )}
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!selectedDocument || !imageFile || isUploading} // 업로드 중 비활성화
          size="none"
          className="w-[80%] text-md py-3 rounded-2xl">
          {isUploading ? "처리 중..." : "등록하기"}
        </Button>
      </div>
      {activeModal && (
        <RecipientConfirmModal
          onClickFunc={handleConfirm}
          onClose={() => setActiveModal(false)}
        />
      )}
    </>
  );
};

export default RecipientRegisterPage;
