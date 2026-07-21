import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { userForgotPasswordSchema } from "@/schema/userSchema";
import type { ForgotPasswordInputState } from "@/types/auth";
import { Loader2, Mail } from "lucide-react";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

function ForgotPassword() {
  const [input, setInput] = useState<ForgotPasswordInputState>({ email: "" });
  const [inputErrors, setInputErrors] = useState<
    Partial<ForgotPasswordInputState>
  >({});
  const [apiError, setApiError] = useState("");

  const { mutate, isPending } = useForgotPassword();
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = userForgotPasswordSchema.safeParse(input);
    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setInputErrors({ email: fieldErrors.email?.[0] });
      return;
    }
    setInputErrors({});
    setApiError("");

    //* Api implementation
    mutate(input, {
      onSuccess: (data) => {
        toast.success(data?.message || "Password link sent");
        setInput({ email: "" });
      },
      onError: (error) => {
        setApiError(error?.response?.data?.message || "Forgot password failed");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className=" md:p-8 p-4 mx-4  w-full max-w-md md:border border-gray-200 rounded-lg"
      >
        <h1 className="text-center font-bold text-2xl mb-4">Forgot Password</h1>
        {apiError && (
          <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
            {apiError}
          </div>
        )}
        <div className="mb-4 space-y-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              className="pl-10 focus-visible:ring-0"
              value={input.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            {inputErrors.email && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.email}
              </p>
            )}
            <Mail className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <div>
          <Button disabled={isPending} className="w-full" type="submit">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </div>
        <p className="mt-2 text-center">
          Back to{" "}
          <Link className="text-blue-600 hover:text-blue-400" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
