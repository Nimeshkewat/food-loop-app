export interface DashboardAnalyticsResponse {
  success: boolean;
  totalRevenue: number;
  totalOrders: number;
  averageRating: number;
  ordersByStatus: {
    pending: number;
    confirmed: number;
    preparing: number;
    outfordelivery: number;
    delivered: number;
  };
  revenueOverTime: { date: string; revenue: number }[];
  topSellingItems: { name: string; quantitySold: number }[];
}
