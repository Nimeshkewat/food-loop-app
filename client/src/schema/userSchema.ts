import * as z from "zod";

export const userRegisterSchema = z.object({
  fullname: z.string().min(1, "Fullname is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
  contact: z.string().min(10, "Invalid contact number "),
});

export const userLoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});

export const userForgotPasswordSchema = z.object({
  email: z.email("Invalid email address").nonempty("Email is required"),
});

export const userResetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be atleast 8 characters"),
  confirmPassword: z.string().min(8, "Password must be atleast 8 characters"),
});

export const userChangePasswordSchema = z.object({
  oldPassword: z.string().min(8, "Password must be atleast 8 characters"),
  newPassword: z.string().min(8, "Password must be atleast 8 characters"),
  confirmPassword: z.string().min(8, "Password must be atleast 8 characters"),
});
