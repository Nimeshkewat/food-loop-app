import { useAuth } from "@/context/AuthProvider";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }: { children: ReactNode }) {
  const { isloading, isAuthenticated } = useAuth();
  //*  waiting for check-auth api to complete
  if (isloading) return;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;
