import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { RestaurantReviewsResponse } from "@/types/review";
import { useQuery } from "@tanstack/react-query";

const getRestaurantReviews = async (
  restaurantId: string,
): Promise<RestaurantReviewsResponse> => {
  const response = await api.get(`/reviews/${restaurantId}`);
  return response.data;
};

export const useGetRestaurantReviews = (restaurantId: string) => {
  return useQuery<RestaurantReviewsResponse, ApiError>({
    queryKey: ["fetch-reviews", restaurantId],
    queryFn: () => getRestaurantReviews(restaurantId),
  });
};
