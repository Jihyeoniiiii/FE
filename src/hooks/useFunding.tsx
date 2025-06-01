import {
  useMutation,
  useQuery,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import {
  createFunding,
  fetchFunding,
  FundingData,
  CreateFundingData,
  fetchFundingByCondition,
  FundingByConditionData,
  fetchFundingByRecommend,
} from "@/lib/api/funding";

export const useFundingDetail = (
  fundingId?: number
): UseQueryResult<FundingData | null, Error> => {
  return useQuery({
    queryKey: ["funding", fundingId],
    queryFn: async () => {
      if (!fundingId) return null;
      return await fetchFunding(fundingId);
    },
    enabled: !!fundingId,
  });
};

export const useCreateFunding = (): UseMutationResult<
  FundingData,
  Error,
  CreateFundingData,
  unknown
> => {
  return useMutation({
    mutationFn: (fundingData: CreateFundingData) => createFunding(fundingData),
    onSuccess: (data: FundingData) => {
      console.log("펀딩 생성 성공:", data);
    },
    onError: (error: Error) => {
      console.error("펀딩 생성 실패:", error);
    },
  });
};

interface UseFundingListOptions {
  status?: "ONGOING" | "COMPLETED" | "FAILED";
  title?: string;
  cursor?: number;
  limit?: number;
}

export const useFundingList = (
  options: UseFundingListOptions = {}
): UseQueryResult<FundingByConditionData | undefined, Error> => {
  return useQuery({
    queryKey: ["fundingList", options],
    queryFn: () =>
      fetchFundingByCondition(
        options.status,
        options.title,
        options.cursor,
        options.limit
      ),
    enabled: true,
  });
};

interface UseFundingRecommendOptions {
  cursor?: number;
  limit?: number;
}

export const useFundingRecommendList = (
  options: UseFundingRecommendOptions = {}
): UseQueryResult<FundingByConditionData | undefined, Error> => {
  return useQuery({
    queryKey: ["fundingRecommendList", options],
    queryFn: () => fetchFundingByRecommend(options.cursor, options.limit),
    enabled: true,
  });
};
