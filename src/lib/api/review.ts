import axiosInstance from "./axios";

export interface ReviewListData {
  success: boolean;
  data: {
    values: ReviewItem[];
    hasPrevious: boolean;
    hasNext: boolean;
  };
}

export interface ReviewDetailData {
  success: boolean;
  data: ReviewDetailItem;
}

export interface ReviewDetailItem {
  id: number;
  title: string;
  content: string;
  reviewImages: ReviewImage[];
  createdAt: string;
}

export interface ReviewItem {
  id: number;
  fundingId: number;
  title: string;
  reviewImage?: ReviewImage;
  createdAt: string;
}

export interface ReviewImage {
  fileUrl: string;
  fileSize: number;
  contentType: string;
}

export interface CreateReviewData {
  title: string;
  content: string;
  imageUrls: string[];
}

export const createReview = async (
  reviewData: CreateReviewData,
  fundingId?: number
) => {
  const response = await axiosInstance.post(
    `/api/v1/review?fundingId=${fundingId}`,
    reviewData
  );

  return response.data;
};

export const fetchReviewList = async (
  cursor?: number,
  limit: number = 8
): Promise<ReviewListData> => {
  const params = new URLSearchParams();
  if (cursor) params.append("cursor", String(cursor));
  params.append("limit", String(limit));

  const response = await axiosInstance.get(`/api/v1/review/list`);
  return response.data;
};

export const fetchReview = async (
  fundingId: number
): Promise<ReviewDetailData | null> => {
  try {
    const response = await axiosInstance.get<ReviewDetailData>(
      `/api/v1/review/details?fundingId=${fundingId}`
    );

    if (response.data.success && response.data.data) {
      return response.data;
    } else {
      console.error("리뷰 데이터 로딩 실패:", response.data);
      return null;
    }
  } catch (error) {
    console.error("리뷰 데이터 요청 에러:", error);
    return null;
  }
};
