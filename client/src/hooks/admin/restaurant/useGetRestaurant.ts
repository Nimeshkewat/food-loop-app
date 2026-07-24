import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { RestaurantResponse } from "@/types/restaurant";
import { useQuery } from "@tanstack/react-query";

const getRestaurant = async () => {
  const response = await api.get("/restaurant");
  return response.data;
};

export const useGetRestaurant = () => {
  return useQuery<RestaurantResponse, ApiError>({
    queryKey: ["fetchRestaurant"],
    queryFn: getRestaurant,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
