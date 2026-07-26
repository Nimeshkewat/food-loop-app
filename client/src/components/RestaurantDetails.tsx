import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import MenuList from "./MenuList";
import { useGetRestaurantDetails } from "@/hooks/restaurant/useGetRestaurantDetails";
import Loader from "./ui/Loader";

function RestaurantDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetRestaurantDetails(id || "");

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src={data?.restaurant?.imageUrl}
            alt="restaurant-image"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-between md:flex-row md:px-4">
          <div className="my-5">
            <h1 className="font-medium text-xl">
              {data?.restaurant?.restaurantName}
            </h1>
            <div className="flex gap-2 my-2">
              {data?.restaurant?.cuisines.map((item: string, index: number) => (
                <Badge className="bg-black" key={index}>
                  {item}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer />
                <h1 className="flex items-center gap-2">
                  Delivery Time:{" "}
                  <span className="text-primary">
                    {data?.restaurant?.deliveryTime} mins
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* available menu */}
        {data && <MenuList menus={data?.restaurant?.menus} />}
      </div>
    </div>
  );
}

export default RestaurantDetails;
