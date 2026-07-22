import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { UpdateProfileResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

const updateProfile = async (
  formData: FormData,
): Promise<UpdateProfileResponse> => {
  const response = await api.patch("/users/update-profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const useProfileUpdate = () => {
  return useMutation<UpdateProfileResponse, ApiError, FormData>({
    mutationFn: updateProfile,
  });
};
