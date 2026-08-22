import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDashboardAnalytics } from "@/hooks/admin/analytics/useGetDashboardAnalytics";
import Loader from "@/components/ui/Loader";
import { IndianRupee, ShoppingBag, Star, Clock } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#3b82f6",
  preparing: "#8b5cf6",
  outfordelivery: "#06b6d4",
  delivered: "#22c55e",
};

function Analytics() {
  const { data, isLoading } = useGetDashboardAnalytics();

  if (isLoading) return <Loader />;
  if (!data) return null;

  const statusData = Object.entries(data.ordersByStatus).map(
    ([status, count]) => ({
      status,
      count,
    }),
  );

  return (
    <div className="max-w-6xl mx-auto my-10 px-4 space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
              <IndianRupee className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Revenue</p>
              <p className="text-xl font-bold">₹{data.totalRevenue}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
              <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Orders</p>
              <p className="text-xl font-bold">{data.totalOrders}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900">
              <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Average Rating</p>
              <p className="text-xl font-bold">
                {data.averageRating > 0 ? data.averageRating.toFixed(1) : "—"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900">
              <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending Orders</p>
              <p className="text-xl font-bold">{data.ordersByStatus.pending}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue over time + status breakdown */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            {data.revenueOverTime.length === 0 ? (
              <p className="text-sm text-muted-foreground py-10 text-center">
                No revenue data yet
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data.revenueOverTime}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`₹${value}`, "Revenue"]} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Orders by Status</CardTitle>
          </CardHeader>
          <CardContent>
            {data.totalOrders === 0 ? (
              <p className="text-sm text-muted-foreground py-10 text-center">
                No orders yet
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ status, count }) => `${status}: ${count}`}
                  >
                    {statusData.map((entry) => (
                      <Cell
                        key={entry.status}
                        fill={STATUS_COLORS[entry.status]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top selling items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top Selling Items</CardTitle>
        </CardHeader>
        <CardContent>
          {data.topSellingItems.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">
              No sales data yet
            </p>
          ) : (
            <div className="space-y-3">
              {data.topSellingItems.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {index + 1}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.quantitySold} sold
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Analytics;
