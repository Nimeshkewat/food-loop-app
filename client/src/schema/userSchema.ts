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
