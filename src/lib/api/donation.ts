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

export const createDonation = async (
    donationData: DonationCreateData
) : Promise<DonationCreateResponse> => {
  const response = await axiosInstance.post("/api/v1/donation", donationData);
  return response.data;
};