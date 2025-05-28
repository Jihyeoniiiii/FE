import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";
import axiosInstance from "@/lib/api/axios";

interface ImageUploadProps {
  setImageUrl: (url: string) => void;
  type?: "primary" | "soft";
  text?: string;
  module: "funding" | "review";
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
      const formData = new FormData();
      formData.append("multipartFile", file);

      const endpoint = `/api/v1/file/${module}`;

      const response = await axiosInstance.post(endpoint, formData);
      
      if (response.status === 200) {
        return response.data.data[0].fileUrl;
      } else {
        console.error("파일 업로드 실패:", response.statusText);
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
