import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { RestaurantDetailsResponse } from "@/types/restaurant";
import { useQuery } from "@tanstack/react-query";

const getRestaurantDetails = async (restaurantId: string) => {
  const response = await api.get(`/restaurants/${restaurantId}`);
  return response.data;
};

export const useGetRestaurantDetails = (restaurantId: string) => {
  return useQuery<RestaurantDetailsResponse, ApiError>({
    queryKey: ["fetchRestaurantDetails", restaurantId],
    queryFn: () => getRestaurantDetails(restaurantId),
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: !!restaurantId,
  });
};
