import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "@/modules/auth/store/authStore";

export default function GuestGuard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const location = useLocation();

  if (isAuthenticated && !location.pathname.startsWith("/forgot-password")) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
