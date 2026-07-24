import OrgAdminDashboard from "../components/org-admin/OrgAdminDashboardPage"; 
import EngineerDashboard from "../components/engineer/EngineerDashboardPage";
import SuperAdminDashboard from "../components/super-admin/SuperAdminDashboardPage";

import { useAuthStore } from "@/modules/auth/store/authStore";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  switch (user?.role) {
    case "ORG_ADMIN":
      return <OrgAdminDashboard />;

    case "ENGINEER":
      return <EngineerDashboard />;

    case "SUPER_ADMIN":
      return <SuperAdminDashboard />;

    default:
      return null;
  }
}