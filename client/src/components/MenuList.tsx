import type { Menu } from "@/types/menu";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function MenuList({ menus }: { menus: Menu[] }) {
  const { mutate, isPending } = useAddToCart();
  const queryClient = useQueryClient();
  const [loadingMenuId, setLoadingMenuId] = useState<string | null>(null);

  const hanldeAddToCart = (menuId: string) => {
    setLoadingMenuId(menuId);
    mutate(
      { menuId, quantity: 1 },
      {
        onSuccess: async (data) => {
          toast.success(data.message);
          await queryClient.invalidateQueries({ queryKey: ["fetchCart"] });
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Failed to add item");
        },
        onSettled: () => {
          setLoadingMenuId(null);
        },
      },
    );
  };

  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Available Menus</h1>
      <div className="grid md:grid-cols-3 gap-4 space-y-4 md:space-y-0">
        {menus.map((menu) => (
          <Card
            key={menu._id}
            className="md:max-w-md w-full mx-auto shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={menu?.image}
              alt="menu-image"
              className="w-full h-40 object-cover "
            />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {menu?.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{menu?.description}</p>
              <h3 className="text-lg font-semibold mt-4">
                Price: <span className="text-primary">₹{menu?.price}</span>
              </h3>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                disabled={isPending && loadingMenuId === menu._id}
                onClick={() => hanldeAddToCart(menu._id)}
                className="w-full"
              >
                {isPending && loadingMenuId === menu._id ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MenuList;
