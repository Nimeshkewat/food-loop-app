import api from "@/axios";
import type { ApiError } from "@/types/api";
import type {
  UpdateReviewInputState,
  UpdateReviewResponse,
} from "@/types/review";
import { useMutation } from "@tanstack/react-query";

const updateReview = async (
  input: UpdateReviewInputState,
): Promise<UpdateReviewResponse> => {
  const { foodRating, deliveryRating, comment, reviewId } = input;
  const response = await api.patch(`/reviews/${reviewId}`, {
    foodRating,
    deliveryRating,
    comment,
  });
  return response.data;
};

export const useUpdateReview = () => {
  return useMutation<UpdateReviewResponse, ApiError, UpdateReviewInputState>({
    mutationFn: updateReview,
  });
};
