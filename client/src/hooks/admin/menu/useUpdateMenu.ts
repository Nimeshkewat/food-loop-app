import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { MenuResponse } from "@/types/menu";
import { useMutation } from "@tanstack/react-query";

interface UpdateMenuParams {
  formData: FormData;
  menuId: string;
}

const updateMenu = async ({ formData, menuId }: UpdateMenuParams) => {
  const response = await api.patch(`/menus/${menuId}/edit`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const useUpdateMenu = () => {
  return useMutation<MenuResponse, ApiError, UpdateMenuParams>({
    mutationFn: updateMenu,
  });
};
