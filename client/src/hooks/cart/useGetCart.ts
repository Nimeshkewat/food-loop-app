import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { GetCartResponse } from "@/types/cart";
import { useQuery } from "@tanstack/react-query";

const getCart = async (): Promise<GetCartResponse> => {
  const response = api.get("/cart");
  return (await response).data;
};

export const useGetCart = () => {
  return useQuery<GetCartResponse, ApiError>({
    queryKey: ["fetchCart"],
    queryFn: getCart,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
