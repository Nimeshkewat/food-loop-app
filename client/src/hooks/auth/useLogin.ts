import api from "@/axios";
import type { LoginInputState } from "@/pages/auth/Login";
import { useMutation } from "@tanstack/react-query";

const login = async (input: LoginInputState) => {
  const response = await api.post("/users/login", input);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
