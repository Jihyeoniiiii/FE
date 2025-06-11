import {
  createDonation,
  DonationCreateData,
  DonationCreateResponse,
  DonationRewardData,
  fetchDonationReward,
} from "@/lib/api/donation";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient, 
} from "@tanstack/react-query";

interface UseDonationResult {
  donationRewardQuery: UseQueryResult<DonationRewardData | null, Error>;

  createDonationMutation: UseMutationResult<
    DonationCreateResponse,
    Error,
    DonationCreateData,
    unknown
  >;
}

export const useDonation = (): UseDonationResult => {
  const queryClient = useQueryClient(); 

  const createDonationMutation = useMutation<
    DonationCreateResponse,
    Error,
    DonationCreateData
  >({
    mutationFn: (donationData: DonationCreateData) =>
      createDonation(donationData),
    onSuccess: (data: DonationCreateResponse) => {
      if (data?.data?.id) {
        console.log("기부 생성 성공", data);
        // 결제 성공 시에만! "donationReward" 쿼리를 'stale' 상태로 만듭니다.
        // 이렇게 하면 해당 쿼리를 구독하는 컴포넌트(NotifyPage)가
        // 다음에 렌더링될 때 새로운 데이터를 가져옵니다.
        queryClient.invalidateQueries({ queryKey: ["donationReward"] });
      } else {
        console.warn("기부 생성 성공했지만 ID가 없습니다.", data);
      }
    },
    onError: (error: Error) => {
      console.error("결제 생성 실패:", error);
    },
  });

  const donationRewardQuery: UseQueryResult<DonationRewardData | null, Error> =
    useQuery({
      queryKey: ["donationReward"],
      queryFn: fetchDonationReward,
      // --- React Query v5 핵심 설정 ---
      // 데이터가 항상 fresh한 상태로 시작하여, 명시적인 invalidate에 의해서만 refetch
      staleTime: Infinity, // 캐시된 데이터가 영원히 'fresh' 상태를 유지하도록 설정
      gcTime: Infinity, // 캐시된 데이터를 가비지 컬렉션하지 않고 영원히 유지
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 리프레시 방지
      refetchOnMount: false, // 컴포넌트 마운트 시 자동 리프레시 방지 (중요!)
      refetchOnReconnect: false, // 네트워크 재연결 시 자동 리프레시 방지
      enabled: false, // 초기 렌더링 시에는 쿼리를 비활성화 (뒤에서 다시 활성화)
      // ---------------------------------
    });


  return {
    createDonationMutation,
    donationRewardQuery,
  };
};
