import axiosInstance from "./axios";

export interface FundingData {
  title: string;
  content: string;
  imageUrls: string[];
  itemLink: string;
  address: string;
  goalAmount: number;
  endDate: string;
}

export const createFunding = async (
  fundingData: FundingData
): Promise<FundingData> => {
  const response = await axiosInstance.post("/api/v1/funding", fundingData);
  return response.data;
};