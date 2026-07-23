import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { VerifyEmailResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

const verifyEmail = async (verificationCode: string) => {
  const response = await api.post("/users/verify-email", { verificationCode });
  return response.data;
};

export const useVerifyEmail = () => {
  return useMutation<VerifyEmailResponse, ApiError, string>({
    mutationFn: verifyEmail,
  });
};
