import * as z from "zod";

export const restaurantFormSchema = z.object({
  restaurantName: z.string().min(1, "Restaurant name is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  //* z.coerce handles converting the input string to a number automatically
  deliveryTime: z.coerce
    .number()
    .min(0, { message: "Delivery time cannot be negative" }),
  cuisines: z.array(z.string()).min(1, "At least one cuisine is required"),
  imageFile: z
    .instanceof(File, { message: "Image file is required" })
    .optional()
    .refine((file) => file && file.size > 0, {
      message: "Image file is required",
    }),
});

export type RestaurantFormSchema = z.infer<typeof restaurantFormSchema>;
