import { useAuth } from "@/context/AuthProvider";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../ui/Loader";

function PrivateRoute({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();
  if (isLoading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
