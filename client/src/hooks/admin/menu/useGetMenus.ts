import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { GetMenuResponse } from "@/types/menu";
import { useQuery } from "@tanstack/react-query";

const getMeuns = async (): Promise<GetMenuResponse> => {
  const response = await api.get("/menus");
  return response.data;
};

export const useGetMenus = () => {
  return useQuery<GetMenuResponse, ApiError>({
    queryKey: ["fetchMenus"],
    queryFn: getMeuns,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
