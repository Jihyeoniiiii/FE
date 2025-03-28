import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "채움 - 랜딩 페이지  ",
  description: "채움 웰컴 페이지 입니다!",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <body>{children}</body>;
}
