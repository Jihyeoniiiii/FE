import axiosInstance from "./axios";

export interface CreateReviewData {
    title: string;
    content: string;
    imageUrls: string[];
}

export const createReview = async (
    reviewData: CreateReviewData,
    fundingId?: number,
) => {
    const response = await axiosInstance.post(`/api/v1/review?fundingId=${fundingId}`, reviewData);
    return response.data;
}