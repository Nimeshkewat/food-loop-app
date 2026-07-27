export interface CartItem {
  menuId: string;
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  _id: string;
  user: string;
  restaurant: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartCartResponse {
  success: boolean;
  message: string;
  cart: Cart;
}

export interface AddToCartInputState {
  menuId: string;
  quantity: number;
}

// Get Cart
export interface GetCartResponse {
  success: boolean;
  cart: Cart;
}

// Update Cart
export interface UpdateCartInputState {
  menuId: string;
  quantity: number;
}

export interface UpdateCartResponse {
  success: boolean;
  message: string;
  cart: Cart;
}

// Clear cart
export interface ClearCartResponse {
  success: boolean;
  message: string;
}
