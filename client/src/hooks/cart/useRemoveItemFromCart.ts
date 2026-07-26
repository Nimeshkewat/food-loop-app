import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { UpdateCartResponse as RemoveCartResponse } from "@/types/cart";
import { useMutation } from "@tanstack/react-query";

const removeItemFromCart = async (
  menuId: string,
): Promise<RemoveCartResponse> => {
  const response = await api.delete(`/cart/${menuId}`);
  return response.data;
};

export const useRemoveItemFromCart = () => {
  return useMutation<RemoveCartResponse, ApiError, string>({
    mutationFn: removeItemFromCart,
  });
};
