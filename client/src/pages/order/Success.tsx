import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { Separator } from "@/components/ui/separator";
import { useGetOrderById } from "@/hooks/order/useGetOrderById";
import { CheckCircle2, IndianRupee } from "lucide-react";
import { Link, useParams } from "react-router-dom";

function Success() {
  const { orderId } = useParams<{ orderId: string }>();
  const { data, isLoading } = useGetOrderById(orderId ?? "");
  if (isLoading) return <Loader />;

  if (!data?.order) {
    return (
      <div className="flex mt-30 justify-center">
        <h1 className="font-bold text-gray-700 dark:text-gray-300 text-2xl md:text-3xl">
          Order not found.
        </h1>
      </div>
    );
  }

  const { order } = data;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="flex flex-col items-center text-center mb-6">
          <CheckCircle2 className="text-green-500 w-14 h-14 mb-3" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Order Placed!
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Your order has been confirmed and is being prepared.
          </p>
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
                className="object-cover w-14 h-14 rounded-full"
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

        <Separator className="my-4" />

        <div className="flex justify-between font-semibold text-gray-800 dark:text-gray-200 mb-6">
          <span>Total Paid</span>
          <div className="flex items-center">
            <IndianRupee size={16} />
            <span>{order.totalAmount}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link to="/orders">
            <Button variant="outline" className="w-full">
              View All Orders
            </Button>
          </Link>
          <Link to="/">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
