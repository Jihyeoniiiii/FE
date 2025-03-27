import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";

interface ImageUploadProps {
  setImageUrl: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setImageUrl }) => {
  const [imageUrl, setLocalImageUrl] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setLocalImageUrl(reader.result);
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-8">
      <span className="text-sm text-secondary opacity-80">사진 첨부</span>
      {imageUrl ? (
        <div className="w-45 h-30 overflow-hidden">
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={180}
            height={120}
            objectFit="contain"
          />
        </div>
      ) : (
        <label
          htmlFor="picture"
          className="flex inline-flex items-center cursor-pointer"
        >
          <div className="flex w-45 h-30 bg-background rounded-2xl justify-center items-center">
            <div className="flex w-13 h-13 bg-primary rounded-4xl justify-center items-center">
              <Image
                src="/assets/icons/union.svg"
                alt="Union"
                width={25}
                height={25}
              />
            </div>
          </div>
          <Input
            id="picture"
            type="file"
            variant="picture"
            size="xs"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
