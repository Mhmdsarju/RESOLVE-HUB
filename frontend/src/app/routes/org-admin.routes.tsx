import type { RouteObject } from "react-router-dom";

import ProtectedGuard from "@/shared/guards/ProtectedRoute";

import DashboardLayout from "@/modules/dashboard/layout/DashboardLayout";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import OrganizationSettingsPage from "@/modules/organization/pages/OrganizationSettingsPage";
import CompleteOrganizationProfile from "@/modules/organization/pages/CompleteOrganizationProfile"; 

import TeamListPage from "@/modules/team/pages/TeamListPage";
import TeamDetailsPage from "@/modules/team/pages/TeamDetailsPage";
import TeamInvitationPage from "@/modules/team-invitation/pages/TeamInvitationPage";

import IncidentListPage from "@/modules/incident/pages/IncidentListPage";
import IncidentDetailsPage from "@/modules/incident/pages/IncidentDetailsPage";

import MonitoringProjectsPage from "@/modules/monitoring/pages/MonitoringProjectsPage";
import MonitoringProjectDetailsPage from "@/modules/monitoring/pages/MonitoringProjectDetailsPage";

import IntegrationDetailsPage from "@/modules/integration/pages/IntegrationDetailsPage";

import AlertDetailsPage from "@/modules/alert/pages/AlertDetailsPage";

import AlertRuleListPage from "@/modules/alertRule/pages/AlertRuleListPage";
import AlertRuleDetailsPage from "@/modules/alertRule/pages/AlertRuleDetailsPage";

import AlertRoutingRuleListPage from "@/modules/alertRouting/pages/AlertRoutingRuleListPage";
import AlertRoutingRuleDetailsPage from "@/modules/alertRouting/pages/AlertRoutingRuleDetailsPage";

export const orgAdminRoutes: RouteObject[] = [
  {
    element: <ProtectedGuard />,
    children: [
      {
        path: "/organization/verification",
        element: <CompleteOrganizationProfile />,
      },

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

          {
            path: "/monitoring/:projectId/alerts/:alertId",
            element: <AlertDetailsPage />,
          },

          {
            path: "/monitoring/:projectId/alert-rules",
            element: <AlertRuleListPage />,
          },

          {
            path: "/monitoring/:projectId/alert-rules/:alertRuleId",
            element: <AlertRuleDetailsPage />,
          },

          {
            path: "/monitoring/:projectId/alert-routing-rules",
            element: <AlertRoutingRuleListPage />,
          },

          {
            path: "/monitoring/:projectId/alert-routing-rules/:id",
            element: <AlertRoutingRuleDetailsPage />,
          },
        ],
      },
    ],
  },
];