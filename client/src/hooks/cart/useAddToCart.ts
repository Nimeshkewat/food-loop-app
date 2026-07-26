import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { AddToCartCartResponse, AddToCartInputState } from "@/types/cart";
import { useMutation } from "@tanstack/react-query";

const addToCart = async (
  input: AddToCartInputState,
): Promise<AddToCartCartResponse> => {
  const response = await api.post("/cart", input);
  return response.data;
};

export const useAddToCart = () => {
  return useMutation<AddToCartCartResponse, ApiError, AddToCartInputState>({
    mutationFn: addToCart,
  });
};
