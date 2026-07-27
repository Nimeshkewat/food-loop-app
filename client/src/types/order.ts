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
}
