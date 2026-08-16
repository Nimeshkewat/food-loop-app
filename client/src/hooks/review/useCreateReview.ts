import api from "@/axios";
import type { ApiError } from "@/types/api";
import type {
  CreateReviewInputState,
  CreateReviewResponse,
} from "@/types/review";
import { useMutation } from "@tanstack/react-query";

const createReview = async (
  input: CreateReviewInputState,
): Promise<CreateReviewResponse> => {
  const response = await api.post("/reviews", input);
  return response.data;
};

export const useCreateReview = () => {
  return useMutation<CreateReviewResponse, ApiError, CreateReviewInputState>({
    mutationFn: createReview,
  });
};
