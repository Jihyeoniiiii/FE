import { createReview, CreateReviewData } from "@/lib/api/review";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface CreateReviewPayload {
  fundingId?: number;
  reviewData: CreateReviewData;
}

interface UseReviewResult {
  createReviewMutation: UseMutationResult<
    CreateReviewData,
    Error,
    CreateReviewPayload,
    unknown
  >;
}

export const useReview = () => { 
  const createReviewMutation: UseReviewResult['createReviewMutation'] =
    useMutation({
      mutationFn: ({ fundingId, reviewData }: CreateReviewPayload) =>
        createReview(reviewData, fundingId),
      onSuccess: (data: CreateReviewData) => {
        console.log("리뷰 생성 성공:", data);
      },
      onError: (error: Error) => {
        console.error("리뷰 생성 실패:", error);
      },
    });
  return {
    createReviewMutation,
  };
};
