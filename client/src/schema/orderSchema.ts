import * as z from "zod";

export const orderSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  contact: z
    .number({ message: "Contact number is required" })
    .refine((val) => String(val).length === 10, {
      message: "Enter a valid 10-digit contact number",
    }),
});
