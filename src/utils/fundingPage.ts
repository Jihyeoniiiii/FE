import { donationCampaigns } from "@/lib/fundingSampleData";

// 기부의 목표 날짜로부터 남은 날짜 계산
const getRemainingDays = (deadline: Date): string => {
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "오늘 마감";
  if (diffDays <= 3) return "마감 임박";
  return `${diffDays}일 남음`;
};

//data를 feed로 올리기위한 값으로 변경, ex) 목표달성 % or 마감기한
export const transformedCampaigns = donationCampaigns.map((campaign) => ({
  id: campaign.id,
  currentPercent: Math.floor(
    (campaign.currentAmount / campaign.targetAmount) * 100
  ),
  deadline: getRemainingDays(campaign.deadline),
  photo: campaign.photo,
  title: campaign.title,
}));
