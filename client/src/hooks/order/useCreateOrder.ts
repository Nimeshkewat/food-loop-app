import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { CreateOrderInputState, CreateOrderResponse } from "@/types/order";
import { useMutation } from "@tanstack/react-query";

const createOrder = async (
  input: CreateOrderInputState,
): Promise<CreateOrderResponse> => {
  const response = await api.post("/orders", input);
  return response.data;
};

export const useCreatOrder = () => {
  return useMutation<CreateOrderResponse, ApiError, CreateOrderInputState>({
    mutationFn: createOrder,
  });
};
