import type { CartItem } from "./cart";
import type { Restaurant } from "./restaurant";
import type { User } from "./user";

export interface CheckoutConfirmationInputState {
  fullname: string;
  email: string;
  address: string;
  contact: number | string;
  city: string;
}

export interface CreateOrderInputState {
  cartItems: {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  deliveryDetails: CheckoutConfirmationInputState;
  totalAmount: number;
  restaurantId: string;
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  key: string;
  dbOrderId: string;
}

export interface VerifyPaymentInputState {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  orderId: string;
}
// types/order.ts — add _id
export interface Order {
  _id: string;
  user: User;
  restaurant: Restaurant;
  deliveryDetails: {
    fullname: string;
    email: string;
    address: string;
    city: string;
    contact: number;
  };
  cartItems: CartItem[];
  totalAmount: number;
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
}

export interface GetOrdersResponse {
  success: boolean;
  orders: Order[];
}

export interface GetOrderByIdResponse {
  success: boolean;
  order: Order;
}

export interface UpdateOrderStatusInputState {
  orderId: string;
  status: string;
}

export interface UpdateOrderStatusResponse {
  success: boolean;
  message: string;
  order: Order;
}
