import api from "@/axios";
import type { ApiError } from "@/types/api";
// import type { ApiError } from "@/types/api";
import type { MenuResponse } from "@/types/menu";
import { useMutation } from "@tanstack/react-query";

const deleteMenu = async (menuId: string): Promise<MenuResponse> => {
  const response = await api.delete(`/menus/${menuId}/delete`);
  return response.data;
};

export const useDeleteMenu = () => {
  return useMutation<MenuResponse, ApiError, string>({
    mutationFn: deleteMenu,
  });
};
