import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { Separator } from "@/components/ui/separator";
import { useGetOrders } from "@/hooks/order/useGetOrders";
import { IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import Review from "./Review";

function MyOrders() {
  const { data, isLoading } = useGetOrders();

  if (isLoading) return <Loader />;

  if (!data?.orders?.length) {
    return (
      <div className="flex mt-30 justify-center">
        <h1 className="font-bold text-gray-700 dark:text-gray-300 text-2xl md:text-3xl">
          Order not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        {data.orders.map((order) => (
          <div key={order._id} className="mb-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl text-gray-800 dark:text-gray-200">
                Order Status:{" "}
                <span className="text-primary">
                  {order.status.toUpperCase()}
                </span>
              </h1>
            </div>

            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Order Summary
            </h2>

            {order.cartItems.map((item) => (
              <div
                key={item.menuId}
                className="flex justify-between items-center mb-3"
              >
                <div className="flex items-center gap-2">
                  <img
                    className="object-cover w-15 h-15 rounded-full"
                    src={item.image}
                    alt={item.name}
                  />
                  <h3 className="text-gray-800 dark:text-gray-200 font-medium">
                    {item.name} × {item.quantity}
                  </h3>
                </div>
                <div className="text-gray-800 dark:text-gray-200 flex items-center">
                  <IndianRupee size={16} />
                  <span className="text-lg font-md">
                    {item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}

            <div className="flex justify-between font-semibold text-gray-800 dark:text-gray-200 mt-3">
              <span className="text-lg">Total</span>
              <div className="flex items-center">
                <IndianRupee size={16} />
                <span className="text-lg">{order.totalAmount}</span>
              </div>
            </div>
            {order.status === "delivered" && <Review orderId={order._id} />}
            <Separator className="my-1" />
          </div>
        ))}
        <Link to="/">
          <Button className="w-full">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}

export default MyOrders;
