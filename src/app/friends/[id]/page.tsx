import BackButton from "@/components/BackButton";
import BottomMenu from "@/components/main/BottomMenu";
import ProgressBar from "@/components/main/ProgressBar";
import Image from "next/image";
import React from "react";

export const generateMetadata = () => {
  return {
    title: `채움 - [친구] 김민상님의 고양이`,
    description: `채움 - [친구] 김민상님의 고양이 페이지입니다.`,
    openGraph: {
      title: `채움 - [친구] 김민상님의 고양이`,
      description: `채움 - [친구] 김민상님의 고양이 페이지입니다.`,
      images: [
        {
          src: "/assets/images/cat.svg",
          width: 100,
          height: 100,
          alt: "cat",
        },
      ],
    },
  };
};

export default function FriendCatPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <BackButton />
      <div className="flex flex-col py-6 space-y-6">
        <h1 className="flex justify-center text-secondary text-2xl font-semibold opacity-80 ">
          김민상님의 고양이
        </h1>
        <ProgressBar now={35} />
      </div>

      <div className="flex justify-center mt-6 py-20 sm:py-15 md:py-12">
        <Image
          src="/assets/images/cat.svg"
          alt="Cat"
          width={180}
          height={180}
        />
      </div>
      <BottomMenu />
    </div>
  );
}
