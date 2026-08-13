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

  USER: {
    BASE: "/users",
  },

  INCIDENT: {
    BASE: "/incidents",
    BY_ID: (id: string) => `/incidents/${id}`,
    STATS: "/incidents/stats",
    STATUS: (id: string) => `/incidents/${id}/status`,
    ASSIGN: (id: string) => `/incidents/${id}/assign`,
  },

  TEAM: {
    BASE: "/teams",
    INVITATIONS: (teamId: string) => `/teams/${teamId}/invitations`,
    MEMBERS: (teamId: string) =>
      `/teams/${teamId}/members`,
  },

  TEAM_INVITATION: {
    ACCEPT: (token: string) => `/team-invitations/accept/${token}`,
    CANCEL: (id: string) => `/team-invitations/${id}`,
  },

  WAR_ROOM: {},
} as const;