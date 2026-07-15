import pizzaImg from "@/assets/pizza.jpg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

function Success() {
  const orders = [1];
  if (orders.length === 0) {
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
        <div className="text-center mb-6">
          <h1 className="text-2xl text-gray-800 dark:to-gray-200">
            Order Status:{" "}
            <span className="text-primary">{"confirm".toUpperCase()}</span>
          </h1>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Order Summary
          </h2>
          {/* your ordered items */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  className="object-cover w-15 h-15 rounded-full"
                  src={pizzaImg}
                  alt=""
                />
                <h3 className="text-gray-800 dark:text-gray-200 font-medium">
                  Food name
                </h3>
              </div>
              <div className="text-right">
                <div className="text-gray-800 dark:text-gray-200 flex items-center">
                  <IndianRupee size={16} />
                  <span className="text-lg font-md">400</span>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <Link to="/">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
