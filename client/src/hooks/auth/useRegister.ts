import api from "@/axios";
import type { RegisterInputState } from "@/pages/auth/Register";
import { useMutation } from "@tanstack/react-query";

const register = async (input: RegisterInputState) => {
  const response = await api.post("/users/register", input);
  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
