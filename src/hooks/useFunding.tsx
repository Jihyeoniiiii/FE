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

interface UseFundingListOptions {
  status?: "ONGOING" | "COMPLETED" | "FAILED";
  title?: string;
  cursor?: number;
  limit?: number;
}

interface UseFundingResult {
  fundingQuery: UseQueryResult<FundingData | null, Error>;
  createFundingMutation: UseMutationResult<
    FundingData,
    Error,
    CreateFundingData,
    unknown
  >;
  fundingListQuery: UseQueryResult<FundingByConditionData | undefined, Error>;
  fundingRecommendListQuery?: UseQueryResult<
    FundingByConditionData | undefined,
    Error
  >;
  refetchFunding: () => void;
}

interface UseFundingParams {
  fundingId?: number;
  listOptions?: UseFundingListOptions;
}

export const useFunding = (params: UseFundingParams = {}): UseFundingResult => {
  const { fundingId, listOptions = {} } = params;
  const fundingQuery: UseQueryResult<FundingData | null, Error> = useQuery({
    queryKey: ["funding", fundingId],
    queryFn: async () => {
      if (!fundingId) return null;
      return await fetchFunding(fundingId);
    },
    enabled: !!fundingId,
  });

  const createFundingMutation: UseMutationResult<
    FundingData,
    Error,
    CreateFundingData,
    unknown
  > = useMutation({
    mutationFn: (fundingData: CreateFundingData) => createFunding(fundingData),
    onSuccess: (data: FundingData) => {
      console.log("펀딩 생성 성공:", data);
    },
    onError: (error: Error) => {
      console.error("펀딩 생성 실패:", error);
    },
  });

  const fundingListQuery: UseQueryResult<
    FundingByConditionData | undefined,
    Error
  > = useQuery({
    queryKey: ["fundingList", listOptions],
    queryFn: () =>
      fetchFundingByCondition(
        listOptions.status,
        listOptions.title,
        listOptions.cursor,
        listOptions.limit
      ),
    enabled: true,
  });

  const fundingRecommendListQuery: UseQueryResult<
    FundingByConditionData | undefined,
    Error
  > = useQuery({
    queryKey: ["fundingRecommendList", listOptions],
    queryFn: () =>
      fetchFundingByRecommend(listOptions.cursor, listOptions.limit),
    enabled: true,
  });

  const refetchFunding = () => {
    fundingQuery.refetch();
  };

  return {
    fundingQuery,
    createFundingMutation,
    fundingListQuery,
    fundingRecommendListQuery,
    refetchFunding,
  };
};
