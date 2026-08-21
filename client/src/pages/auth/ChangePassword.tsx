import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChangePassword } from "@/hooks/auth/useChangePassword";
import { userChangePasswordSchema } from "@/schema/userSchema";
import type { ChangePasswordInputState } from "@/types/auth";
import { Loader2, LockKeyhole } from "lucide-react";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

function ChangePassword() {
  const { mutate, isPending } = useChangePassword();
  const navigate = useNavigate();

  const [input, setInput] = useState<ChangePasswordInputState>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [inputErrors, setInputErrors] = useState<
    Partial<ChangePasswordInputState>
  >({});
  const [apiError, setApiError] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = userChangePasswordSchema.safeParse(input);
    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setInputErrors({
        oldPassword: fieldErrors.oldPassword?.[0],
        newPassword: fieldErrors.newPassword?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      return;
    }

    setInputErrors({});
    setApiError("");

    if (input.newPassword !== input.confirmPassword) {
      return toast.error("Password do not match");
    }

    //* Api implementation
    mutate(input, {
      onSuccess: (data) => {
        toast.success(data.message);
        setInput({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        navigate("/");
      },
      onError: (error) => {
        setApiError(
          error?.response?.data.message || "Failed to change password",
        );
      },
    });
  };
  return (
    <div className="flex  items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className=" md:p-8 p-4 mx-4  w-full max-w-md md:border border-gray-300 dark:border-gray-700 rounded-lg"
      >
        <h1 className="text-center font-bold text-2xl mb-4">Food Loop</h1>
        {apiError && (
          <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
            {apiError}
          </div>
        )}
        <div className="mb-4 space-y-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="Enter old password"
              name="oldPassword"
              className="pl-10 focus-visible:ring-0"
              value={input.oldPassword}
              onChange={handleInputChange}
            />
            <LockKeyhole className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none" />
            {inputErrors.oldPassword && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.oldPassword}
              </p>
            )}
          </div>
          <div className="relative">
            <Input
              type="password"
              placeholder="Enter new Password"
              name="newPassword"
              className="pl-10 focus-visible:ring-0"
              value={input.newPassword}
              onChange={handleInputChange}
            />
            <LockKeyhole className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none" />
            {inputErrors.newPassword && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.newPassword}
              </p>
            )}
          </div>
          <div className="relative">
            <Input
              type="password"
              placeholder="Enter Confirm Password"
              name="confirmPassword"
              className="pl-10 focus-visible:ring-0"
              value={input.confirmPassword}
              onChange={handleInputChange}
            />
            <LockKeyhole className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none" />
            {inputErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.confirmPassword}
              </p>
            )}
          </div>
        </div>
        <div>
          <Button disabled={isPending} className="w-full" type="submit">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Change Passsword"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
