import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { RestaurantOrdersResponse } from "@/types/restaurant";
import { useQuery } from "@tanstack/react-query";

const getRestaurantOrders = async () => {
  const response = await api.get("/restaurant/orders");
  return response.data;
};

export const useGetRestaurantOrders = () => {
  return useQuery<RestaurantOrdersResponse, ApiError>({
    queryKey: ["FetchRestaurantOrders"],
    queryFn: getRestaurantOrders,
  });
};
