import api from "@/axios";
import type { ApiError } from "@/types/api";
import type {
  VerifyPaymentInputState,
  VerifyPaymentResponse,
} from "@/types/order";
import { useMutation } from "@tanstack/react-query";

const verifyPayment = async (
  input: VerifyPaymentInputState,
): Promise<VerifyPaymentResponse> => {
  const response = await api.post("/orders/verify-payment", input);
  return response.data;
};

export const useVerifyPayment = () => {
  return useMutation<VerifyPaymentResponse, ApiError, VerifyPaymentInputState>({
    mutationFn: verifyPayment,
  });
};
