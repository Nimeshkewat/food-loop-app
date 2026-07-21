import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { CheckAuthResponse } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

const checkAuth = async () => {
  const response = await api.get("/users/check-auth");
  return response.data;
};

export function useCheckAuth() {
  return useQuery<CheckAuthResponse, ApiError>({
    queryKey: ["authUser"],
    queryFn: checkAuth,
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
  });
}
