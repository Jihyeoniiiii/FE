import { createPayment, PaymentCreateData } from "@/lib/api/payment";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface UsePaymentResult {
    createPaymentMutation: UseMutationResult<
    PaymentCreateData,
    Error,
    PaymentCreateData,
    unknown
  >;
}

export const usePayment = (): UsePaymentResult => {
    const createPaymentMutation = useMutation<
    PaymentCreateData,
    Error,
    PaymentCreateData
    >({
        mutationFn: (paymentData: PaymentCreateData) => createPayment(paymentData),
            onSuccess: (data: PaymentCreateData) => {
              console.log("결제 생성 성공:", data);
            },
            onError: (error: Error) => {
              console.error("결제 생성 실패:", error);
            },
    })

    return {
        createPaymentMutation
    }
}