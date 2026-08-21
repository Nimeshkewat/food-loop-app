import api from "@/axios";
import type { ApiError } from "@/types/api";
import type {
  ChangePasswordInputState,
  ChangePasswordResponse,
} from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

const changePassword = async (
  input: ChangePasswordInputState,
): Promise<ChangePasswordResponse> => {
  const { oldPassword, newPassword } = input;
  const response = await api.put("/users/change-password", {
    oldPassword,
    newPassword,
  });
  return response.data;
};

export const useChangePassword = () => {
  return useMutation<
    ChangePasswordResponse,
    ApiError,
    ChangePasswordInputState
  >({
    mutationFn: changePassword,
  });
};
