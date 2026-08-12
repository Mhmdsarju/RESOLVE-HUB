import type { RouteObject } from "react-router-dom";

import ProtectedGuard from "@/shared/guards/ProtectedRoute";

import DashboardLayout from "@/modules/dashboard/layout/DashboardLayout";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import OrganizationSettingsPage from "@/modules/organization/pages/OrganizationSettingsPage";

import TeamListPage from "@/modules/team/pages/TeamListPage";
import TeamDetailsPage from "@/modules/team/pages/TeamDetailsPage";

export const orgAdminRoutes: RouteObject[] = [
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
            path: "/organization/settings",
            element: <OrganizationSettingsPage />,
          },

          {
            path: "/teams",
            element: <TeamListPage />,
          },

          {
            path: "/teams/:id",
            element: <TeamDetailsPage />,
          },
        ],
      },
    ],
  },
];
