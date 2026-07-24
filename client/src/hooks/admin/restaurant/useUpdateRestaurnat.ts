import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { RestaurantResponse } from "@/types/restaurant";
import { useMutation } from "@tanstack/react-query";

const updateRestaurant = async (
  formData: FormData,
): Promise<RestaurantResponse> => {
  const response = await api.put("/restaurant", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const useUpdateRestaurant = () => {
  return useMutation<RestaurantResponse, ApiError, FormData>({
    mutationFn: updateRestaurant,
  });
};
