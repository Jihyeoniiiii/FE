import Image from "next/image";
import { Metadata } from "next";
import LoginButtons from "./loginButton";
import Paw from "@/components/ui/paw/Paw";

export const metadata: Metadata = {
  title: "landing - Chaeum",
  description: "채움 앱의 landing page 입니다. ",
};

export default function Randing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      {/* 발자국 이미지 */}
      <div className="absolute top-0 left-[-150] transform -rotate-30">
        <Paw />
      </div>

      {/* Chaeum Logo */}
      <div className="flex flex-col items-center gap-4">
        <Image
          src={"/assets/images/chaeum.svg"}
          alt="Chaeum logo"
          width={250}
          height={300}
        />
      </div>

      {/* Copyright */}
      <div className="absolute bottom-8 inset-x-0 text-center text-gray-500 text-base font-bold ">
        © Copyright Chaeum Team
      </div>

      {/* kakao-logo&네이버 로그인버튼 */}
      <LoginButtons />
    </main>
  );
}
