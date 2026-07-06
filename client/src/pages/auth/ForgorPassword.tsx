import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { useState, type SubmitEvent } from "react";
import { Link } from "react-router-dom";

function ForgorPassword() {
  const loading = false;
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className=" md:p-8 p-4 mx-4  w-full max-w-md md:border border-gray-200 rounded-lg"
      >
        <h1 className="text-center font-bold text-2xl mb-4">Forgot Password</h1>
        <p className="mb-4 text-center">
          Enter your email address to reset your password
        </p>
        <div className="mb-4 space-y-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              className="pl-10 focus-visible:ring-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Mail className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <div>
          <Button disabled={loading} className="w-full" type="submit">
            {loading ? <Loader2 className="animate-spin" /> : "Send Reset Link"}
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

export default ForgorPassword;
