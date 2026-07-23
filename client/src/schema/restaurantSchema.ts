import * as z from "zod";

export const restaurantFormSchema = z.object({
  restaurantName: z.string().min(1, "Restaurant name is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  deliveryTime: z.coerce
    .number({ message: "Delivery time must be a number" })
    .positive("Delivery time must be greater than 0"),
  cuisines: z.array(z.string()).min(1, "At least one cuisine is required"),
});

export type RestaurantFormState = z.infer<typeof restaurantFormSchema>;
