import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useProfile } from "@/hooks/auth/useProfile";
import type { CheckoutConfirmationInputState } from "@/types/order";
import { useGetCart } from "@/hooks/cart/useGetCart";
import { useCreatOrder } from "@/hooks/order/useCreateOrder";
import { useVerifyPayment } from "@/hooks/order/useVerifyPayment";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { orderSchema } from "@/schema/orderSchema";
import z from "zod";

function CheckoutConfirmation({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: profileData } = useProfile();
  const { data: cartData } = useGetCart();
  const { mutate: createOrder, isPending: isOrderCreating } = useCreatOrder();
  const { mutate: verifyPayment } = useVerifyPayment();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const totalAmount = cartData?.cart.items.reduce((acc, curr) => {
    return (acc += curr.price * curr.quantity);
  }, 0);

  const [input, setInput] = useState<CheckoutConfirmationInputState>({
    name: "",
    email: "",
    address: "",
    contact: 0, // was "" — matches number type from the start
    city: "",
  });
  const [inputErrors, setInputErrors] = useState<
    Partial<Record<keyof CheckoutConfirmationInputState, string>>
  >({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: name === "contact" ? Number(value) : value,
    }));
  };

  useEffect(() => {
    if (profileData) {
      setInput({
        name: profileData?.user?.fullname || "",
        email: profileData?.user?.email || "",
        contact: profileData?.user?.contact ?? 0,
        address: profileData.user.address || "",
        city: profileData?.user?.city || "",
      });
    }
  }, [profileData]);

  const handleSubmitCheckout = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = orderSchema.safeParse(input);
    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setInputErrors({
        name: fieldErrors.name?.[0], // was fieldErrors.fullname
        email: fieldErrors.email?.[0],
        address: fieldErrors.address?.[0],
        city: fieldErrors.city?.[0],
        contact: fieldErrors.contact?.[0],
      });
      return;
    }
    setInputErrors({});

    createOrder(
      {
        cartItems: cartData?.cart.items || [],
        deliveryDetails: {
          name: input.name,
          email: input.email,
          address: input.address,
          city: input.city,
          contact: input.contact,
        },
        restaurantId: cartData?.cart.restaurant || "",
        totalAmount: totalAmount || 0,
      },
      {
        onSuccess: (orderData) => {
          const options = {
            key: orderData.key,
            amount: orderData.amount,
            currency: orderData.currency,
            order_id: orderData.razorpayOrderId,
            name: "Your Restaurant App",
            description: "Order Payment",
            prefill: {
              name: input.name,
              email: input.email,
              contact: String(input.contact),
            },
            handler: (response: {
              razorpay_order_id: string;
              razorpay_payment_id: string;
              razorpay_signature: string;
            }) => {
              verifyPayment(
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
                {
                  onSuccess: async (verifyData) => {
                    toast.success(verifyData.message);
                    setOpen(false);
                    await queryClient.invalidateQueries({
                      queryKey: ["fetchCart"],
                    });
                    await queryClient.invalidateQueries({
                      queryKey: ["myOrders"],
                    });
                    navigate(`/orders/${verifyData.orderId}/success`);
                  },
                  onError: (error) => {
                    toast.error(
                      error.response?.data.message ||
                        "Payment verification failed",
                    );
                  },
                },
              );
            },
            modal: {
              ondismiss: () => {
                toast.info("Payment cancelled");
              },
            },
            theme: { color: "#000000" },
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to create order",
          );
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Review Your Order</DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-xs">
          Double-check your delivery details and ensure everything is in order.
          When you are ready, hit confirm button to finalize your order
        </DialogDescription>
        <form
          onSubmit={handleSubmitCheckout}
          className="space-y-3 md:space-y-4"
        >
          <div className="space-y-2">
            <Label>Fullname</Label>
            <Input
              type="text"
              name="name" // was "fullname" — must match state key
              value={input.name}
              onChange={handleChange}
            />
            {inputErrors.name && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.name}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
            {inputErrors.email && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Contact</Label>
            <Input
              type="number"
              name="contact"
              value={input.contact}
              onChange={handleChange}
            />
            {inputErrors.contact && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.contact}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              value={input.address}
              onChange={handleChange}
            />
            {inputErrors.address && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.address}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={handleChange}
            />
            {inputErrors.city && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.city}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              disabled={isOrderCreating}
              type="submit"
              className="bg-black dark:text-white hover:bg-black/80"
            >
              {isOrderCreating ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Continue To Payment"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CheckoutConfirmation;
