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
import { menuSchema, type MenuFormSchema } from "@/schema/menuSchema";
import * as z from "zod";

interface EditMenuProps {
  selectedMenu: MenuFormSchema;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}

function EditMenu({ selectedMenu, editOpen, setEditOpen }: EditMenuProps) {
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

  useEffect(() => {
    setInput({
      name: selectedMenu?.name,
      description: selectedMenu?.description,
      price: selectedMenu?.price,
      image: undefined,
    });
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
    )
  );
}

export default EditMenu;
