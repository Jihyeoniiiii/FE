import { campaignProps } from "@/types/dataTypes";
import { v4 as uuidv4 } from "uuid";

export const donationCampaigns: campaignProps[] = [
  {
    id: uuidv4(),
    targetAmount: 5000000,
    currentAmount: 1200000,
    deadline: new Date(2025, 5, 30),
    photo: "",
    title: "소외된 아이들에게 따뜻한 겨울을 선물하세요!",
  },
  {
    id: uuidv4(),
    targetAmount: 3000000,
    currentAmount: 1500000,
    deadline: new Date(2025, 3, 15),
    photo: "",
    title: "유기동물 보호소 사료 기부 캠페인",
  },
  {
    id: uuidv4(),
    targetAmount: 10000000,
    currentAmount: 6500000,
    deadline: new Date(2025, 7, 10),
    photo: "",
    title: "희귀병 어린이를 위한 의료비 지원 프로젝트",
  },
  {
    id: uuidv4(),
    targetAmount: 8000000,
    currentAmount: 3200000,
    deadline: new Date(2025, 4, 20),
    photo: "",
    title: "환경 보호를 위한 해양 정화 활동",
  },
  {
    id: uuidv4(),
    targetAmount: 6000000,
    currentAmount: 2900000,
    deadline: new Date(2025, 6, 5),
    photo: "",
    title: "청소년 교육 격차 해소를 위한 도서 기부",
  },
  {
    id: uuidv4(),
    targetAmount: 7000000,
    currentAmount: 500000,
    deadline: new Date(2025, 2, 28),
    photo: "",
    title: "저소득층 가정을 위한 생필품 지원 프로젝트",
  },
];
