import { Donation } from "@/components/profile/MyDonationList";

export interface RecipientPreviewImage {
  fileUrl: string;
  fileSize: number;
  contentType: string;
}

export interface RecipientFunding {
  id: number;
  title: string;
  previewImage: RecipientPreviewImage;
  amount: number;
  isReviewed: boolean;
  createdAt: string; // ISO 8601 형식의 날짜/시간 문자열
}

export interface RecipientProps {
  name: string;
  email: string;
  profileImage: string;
  fundings: RecipientFunding[];
}
export interface DonatorProps {
  name: string;
  email: string;
  profileImage: string | null;
  monthlyAmount: number;
  yearlyAmount: number;
  donations: Donation[];
}
