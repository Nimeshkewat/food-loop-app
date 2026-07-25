import type { User } from "./user";

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

// Search Restaurant Respones
export interface SearchRestaurantResponse {
  success: boolean;
  restaurants: Restaurant[];
}

// Restaurant Orders
export interface Order {
  _id: string;
  user: User;
  restaurant: Restaurant;
  deliveryDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
  cartItems: [
    {
      menuId: string;
      name: string;
      image: string;
      price: number;
      quantity: number;
    },
  ];
  totalAmount: string;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "outfordelivery"
    | "delivered";

  razorpayOrderId: string;
  razorpayPaymentId: string;
  paymentStatus: "unpaid" | "paid" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantOrdersResponse {
  success: boolean;
  orders: Order[];
}
