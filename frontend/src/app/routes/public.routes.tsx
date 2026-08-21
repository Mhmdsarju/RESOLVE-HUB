import type { RouteObject } from "react-router-dom";

import PublicLayout from "@/shared/layouts/PublicLayout";
import GuestGuard from "@/shared/guards/GuestGuard";

import LandingPage from "@/modules/landing/pages/LandingPage";
import OrganizationRegisterPage from "@/modules/auth/pages/OrganizationRegisterPage";
import VerifySignupOtpPage from "@/modules/auth/pages/VerifySignupOtpPage";
import OrganizationLoginPage from "@/modules/auth/pages/OrganizationLoginPage";
import UserLoginPage from "@/modules/auth/pages/UserLoginPage";
import ForgotPasswordPage from "@/modules/auth/pages/ForgotPasswordPage";
import VerifyOtpPage from "@/modules/auth/pages/VerifyOtpPage";
import ResetPasswordPage from "@/modules/auth/pages/ResetPasswordPage";
import NotFoundPage from "@/pages/NotFound";
import AcceptInvitationPage from "@/modules/team-invitation/pages/AcceptInvitationPage";

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },

      {
        element: <GuestGuard />,
        children: [
          {
            path: "/organization/register",
            element: <OrganizationRegisterPage />,
          },
          {
            path: "/organization/login",
            element: <OrganizationLoginPage />,
          },
          {
            path: "/user/login",
            element: <UserLoginPage />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPasswordPage />,
          },
          {
            path: "/forgot-password/verify-otp",
            element: <VerifyOtpPage />,
          },
          {
            path: "/forgot-password/reset-password",
            element: <ResetPasswordPage />,
          },
          {
            path: "/accept-invitation/:token",
            element: <AcceptInvitationPage />,
          },
        ],
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },

  {
    element: <PublicLayout />,
    children: [
      {
        path: "/organization/verify-signup-otp",
        element: <VerifySignupOtpPage />,
      },
    ],
  },
];
