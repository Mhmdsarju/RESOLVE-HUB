import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/modules/auth/store/authStore";

export default function ProtectedGuard() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/organization/login"
        replace
      />
    );
  }

  return <Outlet />;
}