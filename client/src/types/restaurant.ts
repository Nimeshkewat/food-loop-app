export interface Restaurant {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  menus: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantInputState {
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
}

export interface RestaurantResponse {
  success: boolean;
  message: string;
  restaurant: Restaurant;
}
