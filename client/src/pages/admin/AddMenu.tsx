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
import EditMenu from "@/components/admin/EditMenu";
import { menuSchema } from "@/schema/menuSchema";
import * as z from "zod";
import type { Menu, MenuInputState } from "@/types/menu";
import { useAddMenu } from "@/hooks/admin/menu/useAddMenu";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMenus } from "@/hooks/admin/menu/useGetMenus";
import Loader from "@/components/ui/Loader";
import { useDeleteMenu } from "@/hooks/admin/menu/useDeleteMenu";

function AddMenu() {
  const { data, isLoading } = useGetMenus();
  const { mutate: addMenu, isPending: isAdding } = useAddMenu();
  const { mutate: deleteMenu, isPending: isDeleting } = useDeleteMenu();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const [input, setInput] = useState<MenuInputState>({
    fullname: "",
    description: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [inputErrors, setInputErrors] = useState<Partial<MenuInputState>>({});
  const [apiError, setApiError] = useState("");
  const [imageError, setImageError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileCahnge = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageError("");
    }
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setInputErrors({
        fullname: fieldErrors.name?.[0],
        description: fieldErrors.description?.[0],
        price: fieldErrors.price?.[0],
      });
      return;
    }

    if (!imageFile) {
      setImageError("Menu image is requied");
      return;
    }
    setInputErrors({});
    setApiError("");

    //* api
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("price", input.price);
    if (imageFile) formData.append("imageFile", imageFile);

    addMenu(formData, {
      onSuccess: async (data) => {
        toast.success(data.message);
        setInput({ fullname: "", description: "", price: "" });
        setImageFile(null);
        setOpen(false);
        await queryClient.invalidateQueries({ queryKey: ["fetchMenus"] });
      },
      onError: (error) => {
        setApiError(error?.response?.data?.message || "failed to add menu");
      },
    });
  };

  const handleMenuDelete = (menuId: string) => {
    deleteMenu(menuId, {
      onSuccess: async (data) => {
        console.log(data);
        toast.success(data.message);
        await queryClient.invalidateQueries({ queryKey: ["fetchMenus"] });
      },
      onError: (error) => {
        setApiError(error?.response?.data?.message || "Failed to delete menu");
      },
    });
  };

  console.log(data);
  if (isLoading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between px-4">
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
              {apiError && (
                <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                  {apiError}
                </div>
              )}
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
                    {inputErrors.name}
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
                    {inputErrors.description}
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
                    {inputErrors.price}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Upload Menu Image</Label>
                <Input type="file" onChange={handleFileCahnge} name="image" />
                {imageError && (
                  <p className="text-red-500 text-xs mt-1">{imageError}</p>
                )}
              </div>
              <DialogFooter>
                <Button disabled={isAdding} type="submit" className="w-full">
                  {isAdding ? <Loader2 className="animate-spin" /> : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* render menus */}
      {data ? (
        data?.menus.map((menu: Menu) => (
          <div key={menu._id} className="mt-6 space-y-4">
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
              <div className="flex flex-col md:w-30 w-full gap-2">
                <Button
                  onClick={() => {
                    setSelectedMenu(menu);
                    setEditOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  disabled={isDeleting}
                  onClick={() => handleMenuDelete(menu._id)}
                  className="bg-red-500 border-red-100 hover:bg-red-400 cursor-pointer"
                >
                  {isDeleting ? <Loader2 className="animate-spin" /> : "Remove"}
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="h-70 flex items-center justify-center">
          <p className="text-2xl font-bold">No menus found</p>
        </div>
      )}
      {selectedMenu && (
        <EditMenu
          menuId={selectedMenu._id}
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          selectedMenu={selectedMenu}
        />
      )}
    </div>
  );
}

export default AddMenu;
