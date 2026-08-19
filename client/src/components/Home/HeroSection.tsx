import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Input } from "../ui/input";
import { Globe, MapPin, Search, Star } from "lucide-react";
import { Button } from "../../components/ui/button";
import pizzaImg from "@/assets/pizza.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllRestaurants } from "@/hooks/restaurant/useGetAllRestaurant";
import Loader from "../ui/Loader";
import { Card, CardContent, CardFooter } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";

function HeroSection() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllRestaurants();
  console.log(data);

  const handleSearchSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/search/${search}`);
  };
  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 py-10 md:py-16">
        <div className="flex flex-col gap-6 md:w-1/2">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold md:font-extrabold text-3xl md:text-5xl leading-tight">
              Order food anytime & anywhere
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Hey! Our delicious food is waiting for you — we are always near
              you.
            </p>
          </div>
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                type="text"
                value={search}
                placeholder="Search restaurant by name, city & country"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                className="pl-10 h-12 border-2 shadow-md"
              />
            </div>
            <Button type="submit" className="h-12 px-6">
              Search
            </Button>
          </form>
        </div>

        <div className="md:w-1/2 w-full">
          <img
            src={pizzaImg}
            alt="hero-section-image"
            className="object-cover w-full max-h-125 rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Featured / top-rated restaurants */}
      <div className="pb-16">
        <h2 className="text-2xl font-bold mb-6">
          Popular Restaurants Near You
        </h2>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.restaurants.slice(0, 8).map((restaurant) => (
              <Card
                key={restaurant._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-200"
              >
                <AspectRatio ratio={4 / 3}>
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.restaurantName}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {restaurant.restaurantName}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <MapPin size={12} />
                    <span>{restaurant.city}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <Globe size={12} />
                    <span>{restaurant.country}</span>
                  </div>
                  {restaurant.averageRating > 0 && (
                    <div className="flex items-center gap-1 text-xs mt-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-medium">
                        {restaurant.averageRating}
                      </span>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-3 pt-0">
                  <Link to={`/restaurant/${restaurant._id}`} className="w-full">
                    <Button size="sm" className="w-full">
                      View Menu
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSection;
