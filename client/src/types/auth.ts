import type { User } from "./user";

export interface CheckAuthResponse {
  success: boolean;
  user: User;
}

// Register
export interface RegisterInputState {
  fullname: string;
  email: string;
  password: string;
  contact: string;
}
export interface RegisterResponse {
  success: boolean;
  message: string;
}

// Login
export interface LoginInputState {
  email: string;
  password: string;
}
export interface LoginResponse {
  success: boolean;
  message: string;
}

// logout
export interface LogoutResponse {
  success: boolean;
  message: string;
}

// Forgot Password
export interface ForgotPasswordInputState {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}
