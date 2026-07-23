import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVerifyEmail } from "@/hooks/auth/useVerifyEmail";
import type { ApiError } from "@/types/api";
import { Loader2 } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type SubmitEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function VerifyEmail() {
  const navigate = useNavigate();
  const { mutate, isPending } = useVerifyEmail();
  const [apiError, setApiError] = useState("");

  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    //* Only take the last character typed (handles overwriting existing characters)
    const character = value.slice(-1);

    if (/^[a-zA-Z0-9]$/.test(character) || character === "") {
      const newOtp = [...otp];
      newOtp[index] = character;
      setOtp(newOtp);

      //* Move focus forward if a character was entered
      if (character !== "" && index < OTP_LENGTH - 1) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // If current field is empty, move back and clear previous field
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRef.current[index - 1]?.focus();
      } else {
        // Clear current field
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    //* Filter to only allow alphanumeric characters up to OTP_LENGTH
    const pastedChars = pastedData
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    if (pastedChars.length > 0) {
      const newOtp = [...otp];
      pastedChars.forEach((char, index) => {
        newOtp[index] = char;
      });
      setOtp(newOtp);

      //* Focus the appropriate input after paste
      const focusIndex = Math.min(pastedChars.length, OTP_LENGTH - 1);
      inputRef.current[focusIndex]?.focus();
    }
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = otp.join("");

    mutate(verificationCode, {
      onSuccess: (data) => {
        toast.success(data?.message);
        navigate("/login", { replace: true });
      },
      onError: (error: ApiError) => {
        setApiError(error.response?.data?.message || "Failed to verify email");
      },
    });
  };

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-black text-2xl">Verify your email</h1>
          <p className="text-sm text-gray-600">
            Enter the 6 digit code sent to your email address
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center gap-2">
            {otp.map((_, index) => (
              <Input
                type="text"
                key={index}
                ref={(element) => {
                  inputRef.current[index] = element;
                }}
                required
                value={otp[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-10 h-10 md:w-12 md:h-12 text-center text-sm md:text-2xl font-bold"
              />
            ))}
          </div>
          {apiError && (
            <div className="p-3 mb-4 mt-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {apiError}
            </div>
          )}
          <Button disabled={isPending} type="submit" className="w-full mt-4">
            {isPending ? <Loader2 className="animate-spin" /> : "Verify"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
