import type { RouteObject } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";
import DashboardPage from "../pages/DashboardPage";

export const dashboardRoutes: RouteObject[] = [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
];