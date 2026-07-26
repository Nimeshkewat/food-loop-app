import api from "@/axios";
import {
  type UpdateCartInputState,
  type UpdateCartResponse,
} from "../../types/cart";
import { useMutation } from "@tanstack/react-query";
import type { ApiError } from "@/types/api";

const updateCart = async (
  input: UpdateCartInputState,
): Promise<UpdateCartResponse> => {
  const { menuId, quantity } = input;
  const response = await api.patch(`/cart/${menuId}`, { quantity });
  return response.data;
};

export const useUpdateCart = () => {
  return useMutation<UpdateCartResponse, ApiError, UpdateCartInputState>({
    mutationFn: updateCart,
  });
};
