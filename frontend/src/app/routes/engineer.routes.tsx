import type { RouteObject } from "react-router-dom";

import ProtectedGuard from "@/shared/guards/ProtectedRoute";

import DashboardLayout from "@/modules/dashboard/layout/DashboardLayout";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";

import EngineerTasksPage from "@/modules/task-management/pages/EngineerTasksPage";
import SettingsPage from "@/modules/user/pages/SettingsPage";
import TaskDetailsPage from "@/modules/task-management/pages/TaskDetailsPage";

import EngineerWarRoomListPage from "@/modules/war-room/pages/EngineerWarRoomListPage";
import EngineerWarRoomDetailsPage from "@/modules/war-room/pages/EngineerWarRoomDetailsPage";

export const engineerRoutes: RouteObject[] = [
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
            path: "/my-tasks",
            element: <EngineerTasksPage />,
          },

          {
            path: "/tasks/:id",
            element: <TaskDetailsPage />,
          },

          {
            path: "/profile",
            element: <SettingsPage />,
          },
          {
            path: "/war-rooms",
            element: <EngineerWarRoomListPage />,
          },

          {
            path: "/war-rooms/:id",
            element: <EngineerWarRoomDetailsPage />,
          },
        ],
      },
    ],
  },
];
