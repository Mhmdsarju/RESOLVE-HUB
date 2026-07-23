import type { RouteObject } from "react-router-dom";

import PublicLayout from "@/shared/layouts/PublicLayout";
import LandingPage from "@/modules/landing/pages/LandingPage";

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },
];