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
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

function CheckoutConfirmation({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [input, setInput] = useState({
    name: "",
    email: "",
    contact: "",
    country: "",
    city: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitCheckout = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    // api implementation
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Review Your Order</DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-xs ">
          Double-check your delivery details and ensure everythin is in order.
          When you are ready, hit confirm button to finalize your order
        </DialogDescription>
        <form
          onSubmit={handleSubmitCheckout}
          className="space-y-1 md:space-y-4"
        >
          <div className="space-y-2">
            <Label>Fullname</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Contact</Label>
            <Input
              type="text"
              name="contact"
              value={input.contact}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>country</Label>
            <Input
              type="text"
              name="country"
              value={input.country}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={handleChange}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-black hover:bg-black/80">
              Continue To Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CheckoutConfirmation;
