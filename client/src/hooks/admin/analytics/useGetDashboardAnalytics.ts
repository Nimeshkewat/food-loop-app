import api from "@/axios";
import type { DashboardAnalyticsResponse } from "@/types/analytics";
import type { ApiError } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

const getDashboardAnalytics = async (): Promise<DashboardAnalyticsResponse> => {
  const response = await api.get("/analytics/dashboard");
  return response.data;
};

export const useGetDashboardAnalytics = () => {
  return useQuery<DashboardAnalyticsResponse, ApiError>({
    queryKey: ["dashboardAnalytics"],
    queryFn: getDashboardAnalytics,
    staleTime: 2 * 60 * 1000,
  });
};
