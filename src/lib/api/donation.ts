import axiosInstance from "./axios";

export interface DonationCreateResponse {
  success: boolean;
  data?: {
    id: number;
    fundingId: number;
    amount: number;
  };
}

export interface DonationCreateData {
  fundingId: number;
  amount: number;
  point: number;
}

export interface InteractionRewardItem {
  interactionType: string;
  quantity: number;
}

export interface DonationRewardData {
  success: boolean;
  data: {
    interactionRewards: InteractionRewardItem[];
    pointReward: number;
    nonInteractionRewardItemId: number;
  } | null;
}

export const fetchDonationReward = async (): Promise<DonationRewardData> => {
  const response = await axiosInstance.get("/api/v1/donation/reward");
  return response.data;
};

export const createDonation = async (
  donationData: DonationCreateData
): Promise<DonationCreateResponse> => {
  try {
    const response = await axiosInstance.post("/api/v1/donation", donationData);
    return response.data;
  } catch (error) {
    console.error("기부 생성 중 에러 발생");
    throw error;
  }
};