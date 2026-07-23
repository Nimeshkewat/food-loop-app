import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { restaurantFormSchema } from "@/schema/restaurantSchema";
import type { CreateRestaurantInputState } from "@/types/restaurant";
import { useCreateRestaurant } from "../../hooks/admin/useCreateRestaurant";
import { Loader2 } from "lucide-react";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import * as z from "zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

function Restaurant() {
  const { mutate, isPending } = useCreateRestaurant();
  const queryClient = useQueryClient();

  // TODO: derive from a useMyRestaurant query later
  const [restaurantAlreadyExist, setRestaurantAlreadyExist] = useState(false);

  const [input, setInput] = useState<CreateRestaurantInputState>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");
  const [apiError, setApiError] = useState("");

  const [inputErrors, setInputErrors] = useState<
    Partial<Record<keyof CreateRestaurantInputState, string>>
  >({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: name === "deliveryTime" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageError("");
    }
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");

    const result = restaurantFormSchema.safeParse(input);
    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setInputErrors({
        restaurantName: fieldErrors.restaurantName?.[0],
        city: fieldErrors.city?.[0],
        country: fieldErrors.country?.[0],
        deliveryTime: fieldErrors.deliveryTime?.[0],
        cuisines: fieldErrors.cuisines?.[0],
      });
      return;
    }

    if (!imageFile) {
      setImageError("Restaurant banner image is required");
      return;
    }

    setInputErrors({});
    setImageError("");

    const formData = new FormData();
    formData.append("restaurantName", input.restaurantName);
    formData.append("city", input.city);
    formData.append("country", input.country);
    formData.append("deliveryTime", input.deliveryTime.toString());
    formData.append("cuisines", JSON.stringify(input.cuisines));
    formData.append("imageFile", imageFile);

    mutate(formData, {
      onSuccess: async (data) => {
        toast.success(data.message);
        await queryClient.invalidateQueries({ queryKey: ["fetchRestaurant"] });
        setRestaurantAlreadyExist(true);
      },
      onError: (error) => {
        setApiError(
          error?.response?.data?.message || "Failed to create restaurant",
        );
      },
    });
  };

  console.log(restaurantAlreadyExist);
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
      </div>

      {apiError && (
        <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="md:grid grid-cols-2 gap-6 space-y-6 md:space-y-0">
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
              <p className="text-red-500 text-xs mt-1">
                {inputErrors.restaurantName}
              </p>
            )}
          </div>

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
              <p className="text-red-500 text-xs mt-1">{inputErrors.city}</p>
            )}
          </div>

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
              <p className="text-red-500 text-xs mt-1">{inputErrors.country}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Delivery Time</Label>
            <Input
              type="number"
              value={input.deliveryTime}
              onChange={handleChange}
              name="deliveryTime"
              placeholder="Enter your delivery time"
            />
            {inputErrors.deliveryTime && (
              <p className="text-red-500 text-xs mt-1">
                {inputErrors.deliveryTime}
              </p>
            )}
          </div>

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
              <p className="text-red-500 text-xs mt-1">
                {inputErrors.cuisines}
              </p>
            )}
          </div>

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
            {imageError && (
              <p className="text-red-500 text-xs mt-1">{imageError}</p>
            )}
          </div>
        </div>

        <div className="my-6">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
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
