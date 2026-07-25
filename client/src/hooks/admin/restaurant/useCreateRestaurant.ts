import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { RestaurantResponse } from "@/types/restaurant";
import { useMutation } from "@tanstack/react-query";

const createRestaurant = async (
  formData: FormData,
): Promise<RestaurantResponse> => {
  const response = await api.post("/restaurants", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const useCreateRestaurant = () => {
  return useMutation<RestaurantResponse, ApiError, FormData>({
    mutationFn: createRestaurant,
  });
};
