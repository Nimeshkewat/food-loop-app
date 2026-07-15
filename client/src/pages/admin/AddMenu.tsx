import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import pizzaImg from "@/assets/pizza.jpg";
import EditMenu from "@/components/admin/EditMenu";
import { menuSchema, type MenuFormSchema } from "@/schema/menuSchema";
import * as z from "zod";

const menus = [
  {
    name: "Food",
    description: "Food description",
    price: "Price",
    image: pizzaImg,
  },
  {
    name: "Food 2",
    description: "Food description 2",
    price: "Price 2",
    image: pizzaImg,
  },
];

function AddMenu() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const loading = false;

  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: "",
    image: undefined,
  });

  const [inputErrors, setInputErrors] = useState<
    Partial<Record<keyof MenuFormSchema, string[]>>
  >({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileCahnge = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setInput((prev) => ({ ...prev, imageFile: file }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setInputErrors(fieldErrors);
      return;
    }
    setInputErrors({});

    //* api
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menus
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="font-medium cursor-pointer text-center flex items-center gap-2 bg-primary hover:bg-primary/70 rounded-md text-white px-3 py-2 transition">
            <Plus /> Add Menu
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="flex items-center justify-center">
              <DialogTitle>Add a new menu</DialogTitle>
              <DialogDescription className="text-center">
                Create a menu that will make your restaurant stand out.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={input.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="Enter menu name"
                />
                {inputErrors.name && (
                  <p className="text-red-500 text-xs mt-1 pl-1 block">
                    {inputErrors.name?.[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  type="text"
                  value={input.description}
                  onChange={handleChange}
                  name="description"
                  placeholder="Enter menu description"
                />
                {inputErrors.description && (
                  <p className="text-red-500 text-xs mt-1 pl-1 block">
                    {inputErrors.description?.[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  type="text"
                  value={input.price}
                  onChange={handleChange}
                  name="price"
                  placeholder="Enter menu price"
                />
                {inputErrors.price && (
                  <p className="text-red-500 text-xs mt-1 pl-1 block">
                    {inputErrors.price?.[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Upload Menu Image</Label>
                <Input type="file" onChange={handleFileCahnge} name="image" />
              </div>
              <DialogFooter>
                <Button disabled={loading} type="submit" className="w-full">
                  {loading ? <Loader2 className="animate-spin" /> : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* render menus */}
      {menus.map((menu: any, index: number) => (
        <div key={index} className="mt-6 space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:space-y-4 md:p-4 p-2 shadow-md rounded-lg">
            <img
              src={menu.image}
              alt=""
              className="md:h-24 md:w-24 h-16 object-cover rounded-lg w-full"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">
                {menu.name}
              </h1>
              <p className="text-sm mt-1 text-gray-600">{menu.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-primary">{menu.price}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setSelectedMenu(menu);
                setEditOpen(true);
              }}
            >
              Edit
            </Button>
            <EditMenu
              editOpen={editOpen}
              setEditOpen={setEditOpen}
              selectedMenu={selectedMenu}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddMenu;
