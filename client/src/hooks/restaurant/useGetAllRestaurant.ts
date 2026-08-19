import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { RestaurantsResponse } from "@/types/restaurant";
import { useQuery } from "@tanstack/react-query";

const getAllRestaurants = async () => {
  const response = await api.get("/restaurants/all");
  return response.data;
};

export const useGetAllRestaurants = () => {
  return useQuery<RestaurantsResponse, ApiError>({
    queryKey: ["fetch-all-restaurants"],
    queryFn: getAllRestaurants,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
