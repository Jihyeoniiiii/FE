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
      } else {
        console.warn("기부 생성 성공했지만 ID가 없습니다.", data);
      }
    },
    onError: (error: Error) => {
      console.error("결제 생성 실패:", error);
    },
  });

    const donationRewardQuery: UseQueryResult<DonationRewardData | null, Error> = useQuery({
        queryKey: ["donationReward"],
        queryFn: fetchDonationReward,
    });

  return {
    createDonationMutation,
    donationRewardQuery,
  };
};
