import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { RegisterInputState, RegisterResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

const register = async (input: RegisterInputState) => {
  const response = await api.post("/users/register", input);
  return response.data;
};

export const useRegister = () => {
  return useMutation<RegisterResponse, ApiError, RegisterInputState>({
    mutationFn: register,
  });
};
