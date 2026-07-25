import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { menuSchema } from "@/schema/menuSchema";
import * as z from "zod";
import type { Menu, MenuInputState } from "@/types/menu";
import { useUpdateMenu } from "@/hooks/admin/menu/useUpdateMenu";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface EditMenuProps {
  menuId: string;
  selectedMenu: Menu;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}

function EditMenu({
  menuId,
  selectedMenu,
  editOpen,
  setEditOpen,
}: EditMenuProps) {
  const { mutate, isPending } = useUpdateMenu();
  const queryClient = useQueryClient();

  const [input, setInput] = useState<MenuInputState>({
    name: "",
    description: "",
    price: "",
  });
  const [originalData, setOriginalData] = useState<MenuInputState>({
    name: "",
    description: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const hasChanges =
    input.name !== originalData.name ||
    input.description !== originalData.description ||
    input.price !== originalData.price ||
    imageFile !== null;

  const [apiError, setApiError] = useState("");
  const [inputErrors, setInputErrors] = useState<
    Partial<Record<keyof MenuInputState, string>>
  >({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileCahnge = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setInputErrors({
        name: fieldErrors.name?.[0],
        description: fieldErrors.description?.[0],
        price: fieldErrors.price?.[0],
      });
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

    mutate(
      { formData, menuId },
      {
        onSuccess: async (data) => {
          console.log(data);
          toast.success(data.message);
          setInput({ name: "", description: "", price: "" });
          await queryClient.invalidateQueries({ queryKey: ["fetchMenus"] });
          setEditOpen(false);
        },
        onError: (error) => {
          setApiError(error?.response?.data?.message || "Failed to edit menu");
        },
      },
    );
  };

  useEffect(() => {
    if (selectedMenu) {
      const fetched: MenuInputState = {
        name: selectedMenu?.name,
        description: selectedMenu?.description,
        price: selectedMenu?.price?.toString(),
      };
      setInput(fetched);
      setOriginalData(fetched);
    }
  }, [selectedMenu]);

  return (
    selectedMenu && (
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader className="flex items-center justify-center">
            <DialogTitle>Edit Menu</DialogTitle>
            <DialogDescription className="text-center">
              Update your menu to keep your offering fresh and exciting.
            </DialogDescription>
            {apiError && (
              <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                {apiError}
              </div>
            )}
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
                  {inputErrors.price}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Upload Menu Image</Label>
              <Input type="file" onChange={handleFileCahnge} name="image" />
            </div>
            <DialogFooter>
              <Button
                disabled={isPending || !hasChanges}
                type="submit"
                className="w-full"
              >
                {isPending ? <Loader2 className="animate-spin" /> : "Edit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  );
}

export default EditMenu;
