import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";

import ProtectedGuard from "@/shared/guards/ProtectedRoute";
import SubscriptionAccessGuard from "@/shared/guards/SubscriptionAccessGuard";

import DashboardLayout from "@/modules/dashboard/layout/DashboardLayout";

import {
  DashboardPage,
  OrganizationSettingsPage,
  CompleteOrganizationProfile,
  TeamListPage,
  TeamDetailsPage,
  TeamInvitationPage,
  IncidentListPage,
  IncidentDetailsPage,
  MonitoringProjectsPage,
  MonitoringProjectDetailsPage,
  IntegrationDetailsPage,
  AlertDetailsPage,
  AlertRuleListPage,
  AlertRuleDetailsPage,
  AlertRoutingRuleListPage,
  AlertRoutingRuleDetailsPage,
  WarRoomListPage,
  WarRoomDetailsPage,
  AuditLogPage,
  SubscriptionPage,
  PrometheusSetupGuidePage,
  ResolveAgentSetupGuidePage,
  OrgAdminPaymentHistoryPage,
} from "./lazyPages";
import RouteLoader from "@/shared/components/RouteLoader";

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<RouteLoader />}>{element}</Suspense>
);

export const orgAdminRoutes: RouteObject[] = [
  {
    element: <ProtectedGuard />,
    children: [
      {
        path: "/organization/verification",
        element: withSuspense(<CompleteOrganizationProfile />),
      },

      {
        element: <DashboardLayout />,
        children: [
          {
            element: <SubscriptionAccessGuard />,
            children: [
              {
                path: "/dashboard",
                element: withSuspense(<DashboardPage />),
              },

              {
                path: "/organization/settings",
                element: withSuspense(<OrganizationSettingsPage />),
              },

              {
                path: "/teams",
                element: withSuspense(<TeamListPage />),
              },

              {
                path: "/team-invitations",
                element: withSuspense(<TeamInvitationPage />),
              },

              {
                path: "/teams/:id",
                element: withSuspense(<TeamDetailsPage />),
              },

              {
                path: "/incidents",
                element: withSuspense(<IncidentListPage />),
              },

              {
                path: "/incidents/:id",
                element: withSuspense(<IncidentDetailsPage />),
              },

              {
                path: "/monitoring",
                element: withSuspense(<MonitoringProjectsPage />),
              },

              {
                path: "/monitoring/:id",
                element: withSuspense(<MonitoringProjectDetailsPage />),
              },

              {
                path: "/monitoring/:projectId/setup-guide",
                element: withSuspense(<PrometheusSetupGuidePage />),
              },

              {
                path: "/monitoring/:projectId/agent-setup",
                element: withSuspense(<ResolveAgentSetupGuidePage />),
              },

              {
                path: "/monitoring/:projectId/integrations/:integrationId",
                element: withSuspense(<IntegrationDetailsPage />),
              },

              {
                path: "/monitoring/:projectId/alerts/:alertId",
                element: withSuspense(<AlertDetailsPage />),
              },

              {
                path: "/monitoring/:projectId/alert-rules",
                element: withSuspense(<AlertRuleListPage />),
              },

              {
                path: "/monitoring/:projectId/alert-rules/:alertRuleId",
                element: withSuspense(<AlertRuleDetailsPage />),
              },

              {
                path: "/monitoring/:projectId/alert-routing-rules",
                element: withSuspense(<AlertRoutingRuleListPage />),
              },

              {
                path: "/monitoring/:projectId/alert-routing-rules/:id",
                element: withSuspense(<AlertRoutingRuleDetailsPage />),
              },

              {
                path: "/war-rooms",
                element: withSuspense(<WarRoomListPage />),
              },

              {
                path: "/war-rooms/:id",
                element: withSuspense(<WarRoomDetailsPage canClose />),
              },

              {
                path: "/audit-logs",
                element: withSuspense(<AuditLogPage />),
              },

              {
                path: "/payment-history",
                element: withSuspense(<OrgAdminPaymentHistoryPage />),
              },
            ],
          },

          {
            path: "/subscription",
            element: withSuspense(<SubscriptionPage />),
          },
        ],
      },
    ],
  },
];
