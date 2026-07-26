import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { ClearCartResponse } from "@/types/cart";
import { useMutation } from "@tanstack/react-query";

const clearCart = async (): Promise<ClearCartResponse> => {
  const response = await api.delete("/cart/clear");
  return response.data;
};

export const useClearCart = () => {
  return useMutation<ClearCartResponse, ApiError, null>({
    mutationFn: clearCart,
  });
};
