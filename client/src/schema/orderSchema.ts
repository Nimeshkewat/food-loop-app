import * as z from "zod";

export const orderSchema = z.object({
  fullname: z.string().nonempty("Fullname is required"),
  email: z.email("Invalid email address"),
  contact: z.number().min(10, "Invalid contact number"),
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
});
