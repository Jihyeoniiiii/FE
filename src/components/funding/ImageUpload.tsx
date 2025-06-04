import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";
import axiosInstance from "@/lib/api/axios";
import imageCompression from "browser-image-compression";

interface ImageUploadProps {
  setImageUrl: (url: string) => void;
  type?: "primary" | "soft";
  text?: string;
  module: "funding" | "review" | "recipient";
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  setImageUrl,
  type = "primary",
  text,
  module,
}) => {
  const [localImageUrl, setLocalImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    try {
      const options = {
        maxSizeMB: 1, // 최대 파일 크기 (메가바이트) 예: 1MB
        maxWidthOrHeight: 1920, // 최대 너비 또는 높이 (픽셀)
        useWebWorker: true, // 웹 워커를 사용하여 성능 향상
      };

      const compressedFile: File = await (async () => {
        try {
          if (file.size / (1024 * 1024) > options.maxSizeMB) {
            const compressed = await imageCompression(file, options);
            console.log("원본 파일 크기:", file.size / 1024 / 1024, "MB");
            console.log(
              "압축된 파일 크기:",
              compressed.size / 1024 / 1024,
              "MB"
            );
            const fileNameParts = compressed.name.split(".");
            const fileExtension = fileNameParts[fileNameParts.length - 1];
            console.log("압축된 파일 확장자:", fileExtension);
            return compressed; // 압축된 파일 반환
          } else {
            return file; // 압축 불필요 시 원본 파일 반환
          }
        } catch (error) {
          console.error("이미지 압축 중 오류 발생:", error);
          return file; // 오류 발생 시 원본 파일 반환 (폴백)
        }
      })(); // 즉시 함수 실행

      const formData = new FormData();
      formData.append("multipartFile", compressedFile);

      const endpoint = `/api/v1/file/${module}`;

      const response = await axiosInstance.post(endpoint, formData);

      if (response.status === 200) {
        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          const fileUrlFromServer = response.data.data[0].fileUrl;

          // review일 때만 도메인 변경
          const finalUrl =
            module === "review"
              ? fileUrlFromServer.replace(
                  "https://chaeum-bucket.s3.ap-northeast-2.amazonaws.com",
                  "https://s3.ap-northeast-2.amazonaws.com"
                )
              : fileUrlFromServer;

          return finalUrl;
        } else {
          console.error("데이터 형식이 다릅니다:", response.data);
          return null;
        }
      } else {
        console.error("파일 업로드 실패:", response.statusText, response.data);
        return null;
      }
    } catch (error: unknown) {
      console.error("파일 업로드 중 오류:", (error as Error).message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrlFromServer = await uploadFile(file);
      if (imageUrlFromServer) {
        setImageUrl(imageUrlFromServer);
        setLocalImageUrl(imageUrlFromServer);
      } else {
        setLocalImageUrl("");
        setImageUrl("");
      }
    }
  };

  return (
    <div className="flex items-center gap-8">
      {text && (
        <span className="text-sm text-secondary opacity-80">{text}</span>
      )}
      {localImageUrl ? (
        <div className="w-45 h-30 overflow-hidden relative">
          <Image
            src={localImageUrl}
            alt="Uploaded Image"
            width={180}
            height={120}
            objectFit="contain"
          />
          {isUploading && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
              <span className="text-white animate-spin">⏳</span>{" "}
            </div>
          )}
        </div>
      ) : (
        <label
          htmlFor="picture"
          className="flex inline-flex items-center cursor-pointer"
        >
          {type === "primary" && (
            <div className="flex w-45 h-30 bg-background rounded-2xl justify-center items-center">
              <div className="flex w-13 h-13 bg-primary rounded-4xl justify-center items-center opacity-90">
                <Image
                  src="/assets/icons/union.svg"
                  alt="Union"
                  width={25}
                  height={25}
                />
              </div>
            </div>
          )}
          {type === "soft" && (
            <div className="flex w-45 h-30 bg-white border-2 border-primary/70 rounded-2xl justify-center items-center">
              <div className="flex w-13 h-13 bg-primary rounded-4xl justify-center items-center opacity-70">
                <Image
                  src="/assets/icons/union.svg"
                  alt="Union"
                  width={25}
                  height={25}
                />
              </div>
            </div>
          )}
          <Input
            id="picture"
            type="file"
            variant="picture"
            size="xs"
            style={{ display: "none" }}
            onChange={handleImageChange}
            accept="image/*"
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
