import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AuthContextTypes {
  isloading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isloading, setIsLoading] = useState(true); //* start true to handle the refresh case
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUserSession = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/users/check-auth",
          { withCredentials: true },
        );
        console.log(data);
        if (data.success) {
          setIsAuthenticated(true);
          setIsAdmin(data?.user?.isAdmin);
        }
      } catch (error: any) {
        console.log(error?.response?.data?.message || "Unauthorized");
      } finally {
        setIsLoading(false);
      }
    };
    verifyUserSession();
  }, []);

  const value = {
    isloading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
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
