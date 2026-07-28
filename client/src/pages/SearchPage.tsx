import FilterPage from "@/components/FilterPage";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Globe, MapPin, X } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { useSearchRestaurants } from "@/hooks/restaurant/useSearchRestaurant";
import Loader from "@/components/ui/Loader";
import useDebounce from "@/hooks/useDebounce";

function SearchPage() {
  const { searchText = "" } = useParams();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const { data, isLoading } = useSearchRestaurants(
    searchText,
    debouncedQuery,
    selectedCuisines,
  );

  const toggleCuisine = (label: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label],
    );
  };
  const resetFilters = () => setSelectedCuisines([]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage
          selectedCuisines={selectedCuisines}
          toggleCuisine={toggleCuisine}
          resetFilters={resetFilters}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search restaurant & cuisinse"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.target.value);
              }}
              className="h-12 border-2 shadow-md"
            />
            <Button className="h-12">Search</Button>
          </div>
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              {data?.restaurants.length !== 0 && (
                <h1 className="font-medium text-lg">
                  ({data?.restaurants.length}) Search result found
                </h1>
              )}

              {data?.restaurants.length === 0 ? (
                <NoResultFound searchText={searchText} />
              ) : (
                <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                  {selectedCuisines.map((cuisine) => (
                    <div
                      className="relative inline-flex items-center max-w-full"
                      key={cuisine}
                    >
                      <Badge
                        variant="outline"
                        className="text-primary pr-5 rounded-md cursor-pointer"
                      >
                        {cuisine}
                      </Badge>
                      <X
                        size={15}
                        className="absolute right-0 text-xs text-primary cursor-pointer"
                        onClick={() => toggleCuisine(cuisine)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isLoading ? (
              <Loader />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.restaurants.map((restaurant) => (
                  <Card
                    key={restaurant._id}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-200"
                  >
                    <div className="relative">
                      <AspectRatio ratio={10 / 6}>
                        <img
                          src={restaurant?.imageUrl}
                          alt="Image"
                          className="rounded-md w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 opacity-75 px-2 rounded-md">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Featured
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {restaurant?.restaurantName}
                      </h1>
                      <div className="mt-2 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />
                        <p className="text-sm">
                          City:{" "}
                          <span className="font-md">{restaurant?.city}</span>
                        </p>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Globe size={16} />
                        <p className="text-sm">
                          Country:{" "}
                          <span className="font-md">{restaurant?.country}</span>
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {["Food 1", "Food 2", "Food 3"].map(
                          (cuisine: string, index: number) => (
                            <Badge
                              key={index}
                              className="bg-black px-2 py-1 font-medium shadow-sm"
                            >
                              {cuisine}
                            </Badge>
                          ),
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                      <Link to={`/restaurant/${restaurant?._id}`}>
                        <Button>View Menu</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;

function NoResultFound({ searchText }: { searchText: string }) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any results for "{searchText}". <hr /> Try searching
        with a different term.
      </p>
      <Link to="/">
        <Button className="mt-4">Go Back to Home</Button>
      </Link>
    </div>
  );
}
