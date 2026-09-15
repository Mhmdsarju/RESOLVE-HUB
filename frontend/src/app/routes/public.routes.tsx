import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";

import PublicLayout from "@/shared/layouts/PublicLayout";
import GuestGuard from "@/shared/guards/GuestGuard";

import {
  LandingPage,
  OrganizationRegisterPage,
  VerifySignupOtpPage,
  OrganizationLoginPage,
  UserLoginPage,
  ForgotPasswordPage,
  VerifyOtpPage,
  ResetPasswordPage,
  NotFoundPage,
  AcceptInvitationPage,
  TermsAndConditionsPage,
  PrivacyPolicyPage,
} from "./lazyPages";

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={null}>
    {element}
  </Suspense>
);

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: withSuspense(<LandingPage />),
      },

      {
        element: <GuestGuard />,
        children: [
          {
            path: "/organization/register",
            element: withSuspense(<OrganizationRegisterPage />),
          },
          {
            path: "/organization/login",
            element: withSuspense(<OrganizationLoginPage />),
          },
          {
            path: "/user/login",
            element: withSuspense(<UserLoginPage />),
          },
          {
            path: "/forgot-password",
            element: withSuspense(<ForgotPasswordPage />),
          },
          {
            path: "/forgot-password/verify-otp",
            element: withSuspense(<VerifyOtpPage />),
          },
          {
            path: "/forgot-password/reset-password",
            element: withSuspense(<ResetPasswordPage />),
          },
          {
            path: "/accept-invitation/:token",
            element: withSuspense(<AcceptInvitationPage />),
          },
          {
            path: "/terms",
            element: withSuspense(<TermsAndConditionsPage />),
          },
          {
            path: "/privacy",
            element: withSuspense(<PrivacyPolicyPage />),
          },
        ],
      },

      {
        path: "*",
        element: withSuspense(<NotFoundPage />),
      },
    ],
  },

  {
    element: <PublicLayout />,
    children: [
      {
        path: "/organization/verify-signup-otp",
        element: withSuspense(<VerifySignupOtpPage />),
      },
    ],
  },
];