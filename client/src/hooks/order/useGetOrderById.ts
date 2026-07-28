import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { GetOrderByIdResponse } from "@/types/order";
import { useQuery } from "@tanstack/react-query";

const getOrderById = async (orderId: string): Promise<GetOrderByIdResponse> => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

export const useGetOrderById = (orderId: string) => {
  return useQuery<GetOrderByIdResponse, ApiError>({
    queryKey: ["orderDetails", orderId],
    queryFn: () => getOrderById(orderId),
  });
};
