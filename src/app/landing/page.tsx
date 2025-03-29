import Image from "next/image";
import { Metadata } from "next";
import LoginButtons from "./loginButton";
import Paw from "@/components/ui/paw/Paw";
import { centerImageStyles, mainStyles } from "@/styles/styles";

export const metadata: Metadata = {
  title: "randing - Chaeum",
  description: "채움 앱의 randing page 입니다. ",
};

export default function Randing() {
  return (
    <main className={mainStyles}>
      {/* 발자국 이미지 */}
      <div className="absolute top-0 left-[-150] transform -rotate-30">
        <Paw />
      </div>

      {/* Chaeum Logo */}
      <div className={centerImageStyles}>
        <Image
          src={"/assets/images/chaeum.png"}
          alt="Chaeum logo"
          width={250}
          height={300}
        />
      </div>

      {/* Copyright */}
      <div style={{ fontWeight: 600 }} className={textStyle}>
        © Copyright Chaeum Team
      </div>

      {/* kakao-logo&네이버 로그인버튼 */}
      <LoginButtons />
    </main>
  );
}
const textStyle =
  "absolute bottom-8 inset-x-0 text-center text-gray-500 text-base";
