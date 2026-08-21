import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "@/modules/auth/store/authStore";
import { useOrganization } from "@/modules/organization/hooks/useOrganization";

import RouteLoading from "@/shared/components/RouteLoading";
import OrganizationLoadError from "@/shared/components/OrganizationLoadError";

export default function ProtectedGuard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const role = useAuthStore((state) => state.user?.role);

  const location = useLocation();

  const { data: organization, isLoading, isError, refetch } = useOrganization();

  if (!isAuthenticated) {
    return <Navigate to="/organization/login" replace />;
  }

  if (role === "SUPER_ADMIN") {
    return <Outlet />;
  }

  if (location.pathname === "/organization/verification") {
    return <Outlet />;
  }

  if (isLoading) {
    return <RouteLoading />;
  }

  if (isError || !organization) {
    return <OrganizationLoadError onRetry={() => refetch()} />;
  }

  if (organization.status !== "ACTIVE") {
    return <Navigate to="/organization/verification" replace />;
  }

  return <Outlet />;
}
