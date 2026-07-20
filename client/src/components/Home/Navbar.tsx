import { Link, useNavigate } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  Package2Icon,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";

function Navbar() {
  const admin = true;
  const loading = false;
  const navigate = useNavigate();

  // const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-7xl w-full mx-auto">
      <div className="flex items-center justify-between h-14 mx-5">
        <Link to="/" className="font-bold md:font-extrabold text-2xl">
          Main Logo
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-6">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/order-status">Order</Link>

            {admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Dashboard</MenubarTrigger>
                  <MenubarContent>
                    <MenubarGroup>
                      <MenubarItem>
                        <Link to="/admin/restaurant">Restaurant</Link>
                      </MenubarItem>
                      <MenubarItem>
                        <Link to="/admin/menu">Menu</Link>
                      </MenubarItem>
                      <MenubarItem>
                        <Link to="/admin/orders">Order</Link>
                      </MenubarItem>
                    </MenubarGroup>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                <Sun />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sun /> Light
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Moon /> Dark
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/cart" className="relative cursor-pointer">
              <ShoppingCart />
              <span className="bg-red-500 absolute -top-2 -left-1 text-white w-4 h-4 rounded-full text-center text-xs">
                5
              </span>
            </Link>
            <div>
              <Avatar onClick={() => navigate("/profile")}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <Button disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : "Logout"}
              </Button>
            </div>
          </div>
        </div>
        {/* mobile screen */}
        <div className="md:hidden lg:hidden">
          <MobileNavbar loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
const MobileNavbar = ({ loading }: { loading: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {" "}
      <Menu onClick={() => setIsOpen(true)} />{" "}
      <SheetContent showCloseButton={false}>
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Main Logo</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              <Sun />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sun /> Light
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Moon /> Dark
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator />
        <SheetDescription className="flex-1">
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-slate-100 py-2 px-4"
            onClick={() => setIsOpen(false)}
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/order-status"
            className="flex items-center gap-4 hover:bg-slate-100 py-2 px-4"
            onClick={() => setIsOpen(false)}
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 hover:bg-slate-100 py-2 px-4"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart />
            <span>Cart</span>
          </Link>
          <Link
            to="/admin/menu"
            className="flex items-center gap-4 hover:bg-slate-100 py-2 px-4"
            onClick={() => setIsOpen(false)}
          >
            <SquareMenu />
            <span>Menu</span>
          </Link>
          <Link
            to="/admin/restaurant"
            className="flex items-center gap-4 hover:bg-slate-100 py-2 px-4"
            onClick={() => setIsOpen(false)}
          >
            <UtensilsCrossed />
            <span>Restaurant</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-4 hover:bg-slate-100 py-2 px-4"
            onClick={() => setIsOpen(false)}
          >
            <Package2Icon />
            <span>Restaurant Orders</span>
          </Link>
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">Username</h1>
          </div>
          <Button disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Logout"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
