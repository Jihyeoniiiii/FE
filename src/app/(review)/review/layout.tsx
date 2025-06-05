import type { Metadata } from "next";

export const metadata: Metadata = {
  themeColor: "#ffffff",
};

export default function RewardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}