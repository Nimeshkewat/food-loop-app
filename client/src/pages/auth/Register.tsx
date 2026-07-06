import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { userRegisterSchema } from "@/schema/userSchema";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Link } from "react-router-dom";
import * as z from "zod";

interface RegisterInputState {
  fullname: string;
  email: string;
  password: string;
  contact: string;
}

function Register() {
  const loading = false;
  const [input, setInput] = useState<RegisterInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });
  const [inputErrors, setInputErrors] = useState<Partial<RegisterInputState>>(
    {},
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    //* Form validataion using zod
    const result = userRegisterSchema.safeParse(input);
    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setInputErrors({
        fullname: fieldErrors.fullname?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        contact: fieldErrors.contact?.[0],
      });
      return;
    }
    setInputErrors({});
    //* Api implementation
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className=" md:p-8 p-4 mx-4  w-full max-w-md md:border border-gray-200 rounded-lg"
      >
        <h1 className="text-center font-bold text-2xl mb-4">Javascript Eats</h1>
        <div className="mb-4 space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="full Name"
              name="fullname"
              className="pl-10 focus-visible:ring-0"
              value={input.fullname}
              onChange={handleInputChange}
            />
            <User className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none" />
            {inputErrors.fullname && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.fullname}
              </p>
            )}
          </div>
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              className="pl-10 focus-visible:ring-0"
              value={input.email}
              onChange={handleInputChange}
            />
            <Mail className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none" />
            {inputErrors.email && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.email}
              </p>
            )}
          </div>
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              className="pl-10 focus-visible:ring-0"
              value={input.password}
              onChange={handleInputChange}
            />
            <LockKeyhole className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none" />
            {inputErrors.password && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.password}
              </p>
            )}
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Contact"
              name="contact"
              className="pl-10 focus-visible:ring-0"
              value={input.contact}
              onChange={handleInputChange}
            />
            <PhoneOutgoing className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none" />
            {inputErrors.contact && (
              <p className="text-red-500 text-xs mt-1 pl-1 block">
                {inputErrors.contact}
              </p>
            )}
          </div>
        </div>
        <div>
          <Button disabled={loading} className="w-full" type="submit">
            {loading ? <Loader2 className="animate-spin" /> : "Register"}
          </Button>
        </div>
        <Separator />
        <p className="mt-2 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-500">
            click here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
