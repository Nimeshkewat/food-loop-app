import api from "@/axios";
import type { ApiError } from "@/types/api";
import type { SearchRestaurantResponse } from "@/types/restaurant";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const searchRestaurants = async (
  searchText: string,
  searchQuery: string,
  selectedCuisines: string[],
): Promise<SearchRestaurantResponse> => {
  const params = new URLSearchParams();

  if (searchQuery) params.append("searchQuery", searchQuery);
  if (selectedCuisines.length > 0) {
    params.set("selectedCuisines", selectedCuisines.join(","));
  }

  const response = await api.get(
    `/restaurants/search/${searchText}?${params.toString()}`,
  );
  return response.data;
};

export const useSearchRestaurants = (
  searchText: string,
  searchQuery: string,
  selectedCuisines: string[],
) => {
  return useQuery<SearchRestaurantResponse, ApiError>({
    queryKey: ["searchRestaurants", searchText, searchQuery, selectedCuisines],
    queryFn: () => searchRestaurants(searchText, searchQuery, selectedCuisines),
    enabled: !!searchText,
    placeholderData: keepPreviousData,
  });
};
