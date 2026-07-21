import api from "@/axios";
import type { ApiError } from "@/types/api";
import type {
  ForgotPasswordInputState,
  ForgotPasswordResponse,
} from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

const forgotPassword = async (input: ForgotPasswordInputState) => {
  const response = await api.post("/users/forgot-password", input);
  return response.data;
};

export const useForgotPassword = () => {
  return useMutation<
    ForgotPasswordResponse,
    ApiError,
    ForgotPasswordInputState
  >({
    mutationFn: forgotPassword,
  });
};
