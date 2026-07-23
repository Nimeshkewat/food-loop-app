import { useCheckAuth } from "@/hooks/auth/useCheckAuth";
import { createContext, useContext, type ReactNode } from "react";

interface AuthContextTypes {
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isError: boolean;
  error: Error | null;
  isVerified: boolean;
}

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, isError, error } = useCheckAuth();
  const isAuthenticated = !isError && data?.user ? true : false;
  const isAdmin = !isError && data?.user?.isAdmin ? true : false;
  const isVerified = data?.user?.isVerified ? true : false;

  if (isError) {
    console.log(error.response?.data.message || error?.message);
  }
  const value = {
    isLoading,
    isAuthenticated,
    isAdmin,
    isError,
    error,
    isVerified,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
