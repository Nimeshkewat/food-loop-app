import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { DeleteReviewResponse } from "@/types/review";
import { useMutation } from "@tanstack/react-query";

const deleteReview = async (
  reviewId: string,
): Promise<DeleteReviewResponse> => {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};

export const useDeleteReview = () => {
  return useMutation<DeleteReviewResponse, ApiError, string>({
    mutationFn: deleteReview,
  });
};
