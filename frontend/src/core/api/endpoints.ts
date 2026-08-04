export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_SIGNUP_OTP: "/auth/verify-signup-otp",
    RESEND_SIGNUP_OTP: "/auth/resend-signup-otp",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",
    RESEND_FORGOT_PASSWORD_OTP: "/auth/resend-forgot-password-otp",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },

  ORGANIZATION: {
    PROFILE: "/organizations/me",
  },

  USER: {},

  INCIDENT: {},

  TASK: {},

  WAR_ROOM: {},
} as const;