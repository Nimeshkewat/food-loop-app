import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { CreateRestaurantResponse } from "@/types/restaurant";
import { useMutation } from "@tanstack/react-query";

const createRestaurant = async (
  formData: FormData,
): Promise<CreateRestaurantResponse> => {
  const response = await api.post("/restaurant", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const useCreateRestaurant = () => {
  return useMutation<CreateRestaurantResponse, ApiError, FormData>({
    mutationFn: createRestaurant,
  });
};
