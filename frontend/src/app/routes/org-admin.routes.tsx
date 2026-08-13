import type { RouteObject } from "react-router-dom";

import ProtectedGuard from "@/shared/guards/ProtectedRoute";

import DashboardLayout from "@/modules/dashboard/layout/DashboardLayout";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import OrganizationSettingsPage from "@/modules/organization/pages/OrganizationSettingsPage";

import TeamListPage from "@/modules/team/pages/TeamListPage";
import TeamDetailsPage from "@/modules/team/pages/TeamDetailsPage";
import TeamInvitationPage from "@/modules/team-invitation/pages/TeamInvitationPage";

import IncidentListPage from "@/modules/incident/pages/IncidentListPage";
import IncidentDetailsPage from "@/modules/incident/pages/IncidentDetailsPage";

import MonitoringProjectsPage from "@/modules/monitoring/pages/MonitoringProjectsPage";
import MonitoringProjectDetailsPage from "@/modules/monitoring/pages/MonitoringProjectDetailsPage";
import IntegrationDetailsPage from "@/modules/integration/pages/IntegrationDetailsPage";

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
            path: "/team-invitations",
            element: <TeamInvitationPage />,
          },

          {
            path: "/teams/:id",
            element: <TeamDetailsPage />,
          },

          {
            path: "/incidents",
            element: <IncidentListPage />,
          },

          {
            path: "/incidents/:id",
            element: <IncidentDetailsPage />,
          },

          {
            path: "/monitoring",
            element: <MonitoringProjectsPage />,
          },

          {
            path: "/monitoring/:id",
            element: <MonitoringProjectDetailsPage />,
          },
          {
            path: "/monitoring/:projectId/integrations/:integrationId",
            element: <IntegrationDetailsPage />,
          },
        ],
      },
    ],
  },
];
