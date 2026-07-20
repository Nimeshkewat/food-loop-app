import { useAuth } from "@/context/AuthProvider";
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }: { children: ReactNode }) {
  const { isloading, isAuthenticated, isAdmin } = useAuth();
  if (isloading) return;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
