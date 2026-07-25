import * as z from "zod";

export const menuSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("description is required"),
  price: z.string().min(0, { error: "Price cannot be negative" }),
});
