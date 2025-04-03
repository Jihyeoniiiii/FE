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

export function timeAgo(date: Date):string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime(); // 밀리초 단위 차이
  const diffSec = Math.floor(diffMs / 1000); // 초 단위
  const diffMin = Math.floor(diffSec / 60); // 분 단위
  const diffHour = Math.floor(diffMin / 60); // 시간 단위
  const diffDay = Math.floor(diffHour / 24); // 일 단위

  if (diffMin < 1) return "방금 전"; // 1분 미만이면 "방금 전"
  if (diffMin < 60) return `${diffMin}분 전`; // 1시간 미만이면 "N분 전"
  if (diffHour < 24) return `${diffHour}시간 전`; // 24시간 미만이면 "N시간 전"
  return `${diffDay}일 전`; // 24시간 이상이면 "N일 전"
}
