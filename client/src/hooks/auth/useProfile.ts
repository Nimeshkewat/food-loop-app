import api from "@/axios";
import type { ProfileResponse } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

const getProfile = async (): Promise<ProfileResponse> => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const useProfile = () => {
  return useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000,
  });
};
