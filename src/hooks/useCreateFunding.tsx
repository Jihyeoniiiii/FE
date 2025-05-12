import { createFunding, FundingData } from "@/lib/api/funding";
import { useMutation } from "@tanstack/react-query";

export const useFunding = () => {
    // const queryClient = useQueryClient();
  
    // const fundingQuery = useQuery({
    //   queryKey: ['fundings'],
    // //   queryFn: fetchFundings, // 펀딩 목록을 가져오는 함수
    // });
  
    const createFundingMutation = useMutation({
      mutationFn: (fundingData: FundingData) => createFunding(fundingData),
      onSuccess: (data: FundingData) => {
        console.log("펀딩 생성 성공:", data);
        // queryClient.invalidateQueries({ queryKey: ["fundings"] });
      },
      onError: (error: Error) => {
        console.error("펀딩 생성 실패:", error);
      },
    });
    return {
        // fundingQuery,
        createFundingMutation,
      };
    };