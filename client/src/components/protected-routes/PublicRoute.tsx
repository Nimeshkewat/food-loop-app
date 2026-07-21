import { useAuth } from "@/context/AuthProvider";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../ui/Loader";

function PublicRoute({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();
  if (isLoading) return <Loader />;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;
