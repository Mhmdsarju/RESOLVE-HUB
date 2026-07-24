import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/modules/auth/store/authStore";

export default function GuestGuard() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}