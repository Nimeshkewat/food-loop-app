import api from "@/axios";
import type { ApiError } from "@/types/api";
import type {
  ResetPasswordInputState,
  ResetPasswordResponse,
} from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

const resetPassword = async (input: ResetPasswordInputState) => {
  const { token, confirmPassword } = input;
  const response = await api.post(`/users/reset-password/${token}`, {
    newPassword: confirmPassword,
  });
  return response.data;
};

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, ApiError, ResetPasswordInputState>({
    mutationFn: resetPassword,
  });
};
