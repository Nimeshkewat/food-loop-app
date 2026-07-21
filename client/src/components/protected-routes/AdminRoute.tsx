import { useAuth } from "@/context/AuthProvider";
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../ui/Loader";

function AdminRoute({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated, isAdmin } = useAuth();
  if (isLoading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
