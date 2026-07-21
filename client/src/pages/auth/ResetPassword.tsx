import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResetPassword } from "@/hooks/auth/useResetPassword";
import { userResetPasswordSchema } from "@/schema/userSchema";
import type { ResetPasswordInputState } from "@/types/auth";
import { Loader2, LockKeyhole } from "lucide-react";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState<Omit<ResetPasswordInputState, "token">>({
    password: "",
    confirmPassword: "",
  });

  const [apiError, setApiError] = useState("");
  const [inputErrors, setInputErros] = useState<
    Partial<ResetPasswordInputState>
  >({});

  const { mutate, isPending } = useResetPassword();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = userResetPasswordSchema.safeParse(input);
    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setInputErros({
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      return;
    }

    if (input.password !== input.confirmPassword) {
      setInputErros({});
      return toast.error("Password do not match");
    }
    if (!token) {
      return toast.error("Invalid Token");
    }

    setInputErros({});
    setApiError("");

    //* Api implementation
    mutate(
      { ...input, token },
      {
        onSuccess: (data) => {
          toast.success(data?.message);
          navigate("/login");
        },
        onError: (error) => {
          setApiError(
            error?.response?.data?.message || "Reset passsword failed",
          );
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className=" md:p-8 p-4 mx-4  w-full max-w-md md:border border-gray-200 rounded-lg"
      >
        <h1 className="text-center font-bold text-2xl mb-4">Reset Password</h1>
        {apiError && (
          <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
            {apiError}
          </div>
        )}
        <div className="mb-4 space-y-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="New Password"
              className="pl-10 focus-visible:ring-0"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
            {inputErrors.password && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.password}
              </p>
            )}
            <LockKeyhole className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative">
            <Input
              type="password"
              placeholder="Confirm Password"
              className="pl-10 focus-visible:ring-0"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleChange}
            />
            {inputErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.confirmPassword}
              </p>
            )}
            <LockKeyhole className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <div>
          <Button disabled={isPending} className="w-full" type="submit">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
