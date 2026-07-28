import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import CheckoutConfirmation from "../components/CheckoutConfirmation";
import { useState } from "react";
import { useGetCart } from "@/hooks/cart/useGetCart";
import Loader from "@/components/ui/Loader";
import { useUpdateCart } from "@/hooks/cart/useUpdateCart";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useRemoveItemFromCart } from "@/hooks/cart/useRemoveItemFromCart";
import { Link } from "react-router-dom";
import { useClearCart } from "@/hooks/cart/useClearCart";

function Cart() {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetCart();
  const queryClient = useQueryClient();

  const { mutate: updateCart, isPending: isUpdating } = useUpdateCart();
  const { mutate: clearCart, isPending: isClearing } = useClearCart();
  const { mutate: removeCartItem, isPending: isRemoving } =
    useRemoveItemFromCart();

  const total = data?.cart.items.reduce((acc, curr) => {
    return (acc += curr.price * curr.quantity);
  }, 0);

  const handleUpdateQuantity = (
    menuId: string,
    currentQty: number,
    action: string,
  ) => {
    const newQty = action === "increment" ? currentQty + 1 : currentQty - 1;
    if (currentQty < 1) return;
    updateCart(
      { menuId, quantity: newQty },
      {
        onSuccess: async (data) => {
          toast.success(data.message);
          await queryClient.invalidateQueries({ queryKey: ["fetchCart"] });
        },
        onError: (error) => {
          const errorMessage = error?.response?.data?.message;
          if (errorMessage === "Quantity is required") return;
          toast.error(errorMessage || "Failed to update quantity");
        },
      },
    );
  };

  const handleRemoveItem = (menuId: string) => {
    removeCartItem(menuId, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({ queryKey: ["fetchCart"] });
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to remove item");
      },
    });
  };

  const handleClearCart = () => {
    clearCart(null, {
      onSuccess: async (data) => {
        toast.success(data.message);
        await queryClient.invalidateQueries({ queryKey: ["fetchCart"] });
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to clear cart");
      },
    });
  };

  if (isLoading) return <Loader />;

  return !data?.cart?.items?.length ? (
    <div className="h-60 flex flex-col gap-2 items-center justify-center font-bold text-2xl">
      <p>No cart items found</p>
      <Link to="/search/india">
        <Button className="w-30">Shop</Button>
      </Link>
    </div>
  ) : (
    <div className="flex flex-col max-w-7xl mx-auto my-10 md:px-4">
      <div className="flex justify-end">
        <Button onClick={handleClearCart} disabled={isClearing} variant="link">
          Clear all
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.cart.items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item.image}></AvatarImage>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>₹{item.price}</TableCell>
              <TableCell>
                <div className="w-fit flex items-center space-x-3 rounded-full border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() =>
                      handleUpdateQuantity(
                        item.menuId,
                        item.quantity,
                        "decrement",
                      )
                    }
                    className="rounded-full"
                    size="icon"
                    variant="outline"
                    disabled={isUpdating}
                  >
                    <Minus />
                  </Button>
                  <Label>{item.quantity}</Label>
                  <Button
                    onClick={() =>
                      handleUpdateQuantity(
                        item.menuId,
                        item.quantity,
                        "increment",
                      )
                    }
                    className="rounded-full"
                    size="icon"
                    variant="outline"
                    disabled={isUpdating}
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>₹{item.price * item.quantity}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleRemoveItem(item.menuId)}
                  disabled={isRemoving}
                  size="sm"
                  variant="destructive"
                >
                  Remove
                </Button>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right text-2xl font-bold">
              ₹{total}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end">
        <Button onClick={() => setOpen(true)}>Proceed to checkout</Button>
      </div>
      <CheckoutConfirmation open={open} setOpen={setOpen} />
    </div>
  );
}

export default Cart;
