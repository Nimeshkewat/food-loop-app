import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { LogoutResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

const logout = async () => {
  const response = await api.post("/users/logout");
  return response.data;
};

export const useLogout = () => {
  return useMutation<LogoutResponse, ApiError, null>({
    mutationFn: logout,
  });
};
