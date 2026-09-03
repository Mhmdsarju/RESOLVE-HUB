import type { RouteObject } from "react-router-dom";

import ProtectedGuard from "@/shared/guards/ProtectedRoute";

import DashboardLayout from "@/modules/dashboard/layout/DashboardLayout";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";

import OrganizationVerificationListPage from "@/modules/organization/pages/admin/OrganizationVerificationListPage";
import OrganizationVerificationReviewPage from "@/modules/organization/pages/admin/OrganizationVerificationReviewPage";
import PlanPage from "@/modules/plan/pages/PlansPage";

export const superAdminRoutes: RouteObject[] = [
  {
    element: <ProtectedGuard />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },

          {
            path: "/organizations",
            element: <OrganizationVerificationListPage />,
          },

          {
            path: "/organizations/:organizationId/verification",
            element: <OrganizationVerificationReviewPage />,
          },
          {
            path: "/plans",
            element: <PlanPage />,
          },
        ],
      },
    ],
  },
];
