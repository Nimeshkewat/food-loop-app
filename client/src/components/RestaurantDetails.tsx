import { useParams } from "react-router-dom";
import pizzaImg from "@/assets/pizza.jpg";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import MenuList from "./MenuList";

function RestaurantDetails() {
  const { id } = useParams();
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h64 lg:h-72">
          <img
            src={pizzaImg}
            alt="restaurant-image"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-between md:flex-row">
          <div className="my-5">
            <h1 className="font-medium text-xl">Restarant Name</h1>
            <div className="flex gap-2 my-2">
              {["food1", "food2", "food3"].map(
                (item: string, index: number) => (
                  <Badge className="bg-black" key={index}>
                    {item}
                  </Badge>
                ),
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer />
                <h1 className="flex items-center gap-2">
                  Delivery Time: <span className="text-primary">35 mins</span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* available menu */}
        <MenuList />
      </div>
    </div>
  );
}

export default RestaurantDetails;
