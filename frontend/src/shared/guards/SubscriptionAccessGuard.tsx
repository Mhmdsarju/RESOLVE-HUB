import { Outlet } from "react-router-dom";

import { useOrganization } from "@/modules/organization/hooks/useOrganization";
import SubscriptionExpiredPage from "@/shared/pages/SubscriptionExpiredPage";

export default function SubscriptionAccessGuard() {
  const { data: organization, isLoading } = useOrganization();

  if (isLoading) {
    return null;
  }

  if (organization?.accessStatus === "FROZEN") {
    return <SubscriptionExpiredPage />;
  }

  return <Outlet />;
}
