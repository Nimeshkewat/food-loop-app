import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AdminOrders() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="mb-10 text-3xl font-extrabold text-gray-900 dark:text-white">
        Orders Overview
      </h1>
      <div className="space-y-8">
        {/* restaurant orders */}
        {[1, 2, 3].map((_, index: number) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex-1 mb-6 sm:mb-0">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Order name
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Address:</span> Lorem, ipsum
                dolor.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Amount: </span> 400
              </p>
            </div>
            <div className="w-full sm:w-1/3 space-y-2">
              <Label>Order Status</Label>
              <Select>
                <SelectTrigger aria-invalid>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "Pending",
                      "Confirmed",
                      "Preparing",
                      "OutForDelivery",
                      "Delivered",
                    ].map((status: string) => (
                      <SelectItem key={status} value={status.toLowerCase()}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
