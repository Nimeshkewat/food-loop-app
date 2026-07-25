import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { MenuResponse } from "@/types/menu";
import { useMutation } from "@tanstack/react-query";

const addMenu = async (formData: FormData): Promise<MenuResponse> => {
  const response = await api.post("/menus", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useAddMenu = () => {
  return useMutation<MenuResponse, ApiError, FormData>({
    mutationFn: addMenu,
  });
};
