import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole } from "lucide-react";
import { useState, type SubmitEvent } from "react";

function ResetPassword() {
  const loading = false;
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Password do not match");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className=" md:p-8 p-4 mx-4  w-full max-w-md md:border border-gray-200 rounded-lg"
      >
        <h1 className="text-center font-bold text-2xl mb-4">Reset Password</h1>
        <div className="mb-4 space-y-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="New Password"
              className="pl-10 focus-visible:ring-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <LockKeyhole className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative">
            <Input
              type="password"
              placeholder="Confirm Password"
              className="pl-10 focus-visible:ring-0"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <LockKeyhole className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <div>
          <Button disabled={loading} className="w-full" type="submit">
            {loading ? <Loader2 className="animate-spin" /> : "Reset Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
