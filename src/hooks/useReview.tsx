import {
  createReview,
  CreateReviewData,
  fetchReview,
  fetchReviewList,
  ReviewDetailData,
  ReviewListData,
} from "@/lib/api/review";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

type CreateReviewParams = {
  fundingId?: number;
  reviewData: CreateReviewData;
};

interface UseReviewListOptions {
  cursor?: number;
  limit?: number;
}

export const useCreateReview = (): UseMutationResult<
  void,
  Error,
  CreateReviewParams,
  unknown
> => {
  return useMutation({
    mutationFn: ({ fundingId, reviewData }: CreateReviewParams) =>
      createReview(reviewData, fundingId),
    onSuccess: () => {
      console.log("후기 생성 성공:");
    },
    onError: (error: Error) => {
      console.error("후기 생성 실패:", error);
    },
  });
};

export const useReviewList = (
  options: UseReviewListOptions = {}
): UseQueryResult<ReviewListData | undefined, Error> => {
  return useQuery({
    queryKey: ["reviewList", options],
    queryFn: () => fetchReviewList(options.cursor, options.limit),
    enabled: true,
  });
};

export const useReviewDetail = (
  fundingId?: number
): UseQueryResult<ReviewDetailData | null, Error> => {
  return useQuery({
    queryKey: ["reviewDetail", fundingId],
    queryFn: async () => {
      if (!fundingId) return null;
      return await fetchReview(fundingId);
    },
    enabled: !!fundingId,
  });
};