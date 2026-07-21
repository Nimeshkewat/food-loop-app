import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { LoginInputState, LoginResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

const login = async (input: LoginInputState) => {
  const response = await api.post("/users/login", input);
  return response.data;
};

export const useLogin = () => {
  return useMutation<LoginResponse, ApiError, LoginInputState>({
    mutationFn: login,
  });
};
