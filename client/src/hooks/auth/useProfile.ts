import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { ProfileResponse } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

const getProfile = async (): Promise<ProfileResponse> => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const useProfile = () => {
  return useQuery<ProfileResponse, ApiError>({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
  });
};
