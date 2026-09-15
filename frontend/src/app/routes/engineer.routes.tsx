import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";

import ProtectedGuard from "@/shared/guards/ProtectedRoute";
import SubscriptionAccessGuard from "@/shared/guards/SubscriptionAccessGuard";

import DashboardLayout from "@/modules/dashboard/layout/DashboardLayout";
import RouteLoader from "@/shared/components/RouteLoader";

import {
  DashboardPage,
  EngineerTasksPage,
  SettingsPage,
  TaskDetailsPage,
  EngineerWarRoomListPage,
  EngineerWarRoomDetailsPage,
} from "./lazyPages";

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<RouteLoader />}>
    {element}
  </Suspense>
);

export const engineerRoutes: RouteObject[] = [
  {
    element: <ProtectedGuard />,
    children: [
      {
        element: <SubscriptionAccessGuard />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: "/dashboard",
                element: withSuspense(<DashboardPage />),
              },

              {
                path: "/my-tasks",
                element: withSuspense(<EngineerTasksPage />),
              },

              {
                path: "/tasks/:id",
                element: withSuspense(<TaskDetailsPage />),
              },

              {
                path: "/profile",
                element: withSuspense(<SettingsPage />),
              },

              {
                path: "/engineer/war-rooms",
                element: withSuspense(<EngineerWarRoomListPage />),
              },

              {
                path: "/engineer/war-rooms/:id",
                element: withSuspense(<EngineerWarRoomDetailsPage />),
              },
            ],
          },
        ],
      },
    ],
  },
];