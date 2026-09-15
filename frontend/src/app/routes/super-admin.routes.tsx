import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";

import ProtectedGuard from "@/shared/guards/ProtectedRoute";

import DashboardLayout from "@/modules/dashboard/layout/DashboardLayout";

import {
  DashboardPage,
  OrganizationVerificationListPage,
  OrganizationVerificationReviewPage,
  PlanPage,
  SuperAdminOrganizationManagement,
  SuperAdminRevenueAnalyticsPage,
  SuperAdminPaymentHistoryPage,
} from "./lazyPages";

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={null}>
    {element}
  </Suspense>
);

export const superAdminRoutes: RouteObject[] = [
  {
    element: <ProtectedGuard />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: withSuspense(<DashboardPage />),
          },

          {
            path: "/organizations",
            element: withSuspense(<OrganizationVerificationListPage />),
          },

          {
            path: "/organizations/:organizationId/verification",
            element: withSuspense(<OrganizationVerificationReviewPage />),
          },

          {
            path: "/plans",
            element: withSuspense(<PlanPage />),
          },

          {
            path: "/users",
            element: withSuspense(<SuperAdminOrganizationManagement />),
          },

          {
            path: "/analytics",
            element: withSuspense(<SuperAdminRevenueAnalyticsPage />),
          },

          {
            path: "/history",
            element: withSuspense(<SuperAdminPaymentHistoryPage />),
          }
        ],
      },
    ],
  },
];