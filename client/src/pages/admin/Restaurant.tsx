import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurantFormSchema,
  type RestaurantFormSchema,
} from "@/schema/restaurantSchema";
import { Loader2 } from "lucide-react";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import * as z from "zod";

function Restaurant() {
  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  //* Type the errors specifically as string arrays mapped to your form keys
  const [inputErrors, setInputErrors] = useState<
    Partial<Record<keyof RestaurantFormSchema, string[]>>
  >({});

  const loading = false;
  const restaurantAlreadyExist = false;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  //* Dedicated file input handler
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setInput((prev) => ({ ...prev, imageFile: file }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Clear previous errors
    setInputErrors({});
    const result = restaurantFormSchema.safeParse(input);
    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setInputErrors(fieldErrors);
      return;
    }

    // Success! Proceed with your API call using result.data
    console.log("Validated Form Data:", result.data);
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="md:grid grid-cols-2 gap-6 space-y-6 md:space-y-0">
          {/* Restaurant Name */}
          <div>
            <Label className="mb-2">Restaurant Name</Label>
            <Input
              type="text"
              name="restaurantName"
              value={input.restaurantName}
              onChange={handleChange}
              placeholder="Enter your restaurant name"
            />
            {inputErrors.restaurantName && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.restaurantName[0]}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <Label className="mb-2">City</Label>
            <Input
              value={input.city}
              onChange={handleChange}
              type="text"
              name="city"
              placeholder="Enter your city name"
            />
            {inputErrors.city && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.city[0]}
              </p>
            )}
          </div>
          {/* Country */}
          <div>
            <Label className="mb-2">Country</Label>
            <Input
              value={input.country}
              onChange={handleChange}
              type="text"
              name="country"
              placeholder="Enter your country name"
            />
            {inputErrors.country && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.country[0]}
              </p>
            )}
          </div>

          {/* Delivery Time */}
          <div>
            <Label className="mb-2">Delivery Time</Label>
            <Input
              type="number"
              value={input.deliveryTime || ""}
              onChange={handleChange}
              name="deliveryTime"
              placeholder="Enter your delivery time"
            />
            {inputErrors.deliveryTime && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.deliveryTime[0]}
              </p>
            )}
          </div>

          {/* Cuisines */}
          <div>
            <Label className="mb-2">Cuisines</Label>
            <Input
              type="text"
              value={input.cuisines.join(", ")}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  cuisines: e.target.value
                    .split(",")
                    .map((c) => c.trim())
                    .filter(Boolean),
                }))
              }
              name="cuisines"
              placeholder="e.g. Italian, Mexican, Chinese"
            />
            {inputErrors.cuisines && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.cuisines[0]}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="imageFile" className="mb-2">
              Upload Restaurant Banner
            </Label>
            <Input
              id="imageFile"
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleFileChange}
            />
            {inputErrors.imageFile && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.imageFile[0]}
              </p>
            )}
          </div>
        </div>

        <div className="my-6">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : restaurantAlreadyExist ? (
              "Update Your Restaurant"
            ) : (
              "Add Your Restaurant"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Restaurant;
