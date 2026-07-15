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

function Cart() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button variant="link">Clear All</Button>
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
          <TableRow>
            <TableCell>
              <Avatar>
                <AvatarImage src=""></AvatarImage>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>Food</TableCell>
            <TableCell>₹400</TableCell>
            <TableCell>
              <div className="w-fit flex items-center space-x-3 rounded-full border-gray-100 dark:border-gray-800 shadow-md">
                <Button className="rounded-full" size="icon" variant="outline">
                  <Minus />
                </Button>
                <Label>3</Label>
                <Button className="rounded-full" size="icon" variant="outline">
                  <Plus />
                </Button>
              </div>
            </TableCell>
            <TableCell>₹400</TableCell>
            <TableCell>
              <Button size="sm" variant="destructive">
                Remove
              </Button>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right text-2xl font-bold">
              ₹400
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
