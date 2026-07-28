import api from "@/axios";
import type { ApiError } from "@/types/api";
import type {
  UpdateOrderStatusInputState,
  UpdateOrderStatusResponse,
} from "@/types/order";
import { useMutation } from "@tanstack/react-query";

const updateOrderStatus = async ({
  orderId,
  status,
}: UpdateOrderStatusInputState): Promise<UpdateOrderStatusResponse> => {
  const response = await api.patch(`/orders/${orderId}/status`, { status });
  return response.data;
};

export const useUpdateOrderStatus = () => {
  return useMutation<
    UpdateOrderStatusResponse,
    ApiError,
    UpdateOrderStatusInputState
  >({
    mutationFn: updateOrderStatus,
  });
};
