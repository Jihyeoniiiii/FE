import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavigationBarWrapper from "@/components/NavigationBarWrapper";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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

export const viewport: Viewport = {
  themeColor: "#E2E3FC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "채움",
  description: "채움 애플리케이션입니다!",
  manifest: "/manifest.json",
  icons: {
      icon: "/assets/images/chaeum.png",
      shortcut: "/assets/images/chaeum.png",
      apple: "/assets/images/chaeum.png",
  },
};
