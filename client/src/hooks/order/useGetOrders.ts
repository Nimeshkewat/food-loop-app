import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { GetOrdersResponse } from "@/types/order";
import { useQuery } from "@tanstack/react-query";

const getOrders = async (): Promise<GetOrdersResponse> => {
  const response = await api.get("/orders");
  return response.data;
};

export const useGetOrders = () => {
  return useQuery<GetOrdersResponse, ApiError>({
    queryKey: ["myOrders"],
    queryFn: getOrders,
  });
};
