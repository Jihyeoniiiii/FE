import type { Metadata } from "next";
import "./globals.css";
import NavigationBarWrapper from "@/components/NavigationBarWrapper";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "채움",
  description: "채움 애플리케이션입니다!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
        <NavigationBarWrapper />
      </body>
    </html>
  );
}
