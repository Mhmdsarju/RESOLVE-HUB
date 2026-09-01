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
    ME: "/users/me",
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
    MEMBERS: (teamId: string) => `/teams/${teamId}/members`,
  },

  TEAM_INVITATION: {
    ACCEPT: (token: string) =>
      `/team-invitations/accept/${token}`,
    CANCEL: (id: string) =>
      `/team-invitations/${id}`,
  },

  MONITORING_PROJECT: {
    BASE: "/monitoring-projects",

    BY_ID: (id: string) => `/monitoring-projects/${id}`,
  },

  MONITORING: {
    PROJECTS: "/monitoring-projects",

    INTEGRATIONS: {
      BY_PROJECT: (projectId: string) => `/monitoring-projects/${projectId}/integrations`,

      BY_ID: (id: string) => `/monitoring-projects/integrations/${id}`,
    },

    ALERT_RULES: {
      BY_PROJECT: (projectId: string) => `/monitoring-projects/${projectId}/alert-rules`,

      BY_ID: (id: string) => `/monitoring-projects/alert-rules/${id}`,

      DEFAULTS: "/monitoring-projects/alert-rules/defaults",

      APPLY_DEFAULT: (projectId: string) => `/monitoring-projects/${projectId}/alert-rules/default`,
    },
  },

  ALERT: {
    BY_PROJECT: (projectId: string) => `/monitoring-projects/${projectId}/alerts`,

    BY_ID: (id: string) => `/alerts/${id}`,

    RESOLVE: (id: string) => `/alerts/${id}/resolve`,
  },

  ALERT_ROUTING_RULE: {
    BASE: "/alert-routing-rules",

    BY_ID: (id: string) => `/alert-routing-rules/${id}`,
  },

  TASK: {
    BASE: "/tasks",

    BY_ID: (id: string) => `/tasks/${id}`,

    BY_INCIDENT: (incidentId: string) => `/tasks/incident/${incidentId}`,

    STATUS: (id: string) => `/tasks/${id}/status`,

    ASSIGN: (id: string) => `/tasks/${id}/assign`,
    MY: "/tasks/my",
  },

  FILE: {
    BY_TASK: (taskId: string) => `/tasks/${taskId}/files`,
    BY_ID: (id: string) => `/files/${id}`,
    DOWNLOAD: (id: string) => `/files/${id}/download`,
  },
  WAR_ROOM: {
    BASE: "/war-rooms",
    BY_ID: (id: string) => `/war-rooms/${id}`,
    CLOSE: (id: string) => `/war-rooms/${id}/close`,
    JOIN: (id: string) => `/war-rooms/${id}/join`,
    LEAVE: (id: string) => `/war-rooms/${id}/leave`,
    MESSAGES: (warRoomId: string) => `${ENDPOINTS.WAR_ROOM.BASE}/${warRoomId}/messages`,
  },

  TIMELINE: {
    BY_INCIDENT: (incidentId: string) => `/timeline/incident/${incidentId}`,
  },

  AUDIT_LOG: {
    BASE: "/audit-logs",
  },

  NOTIFICATION: {
    BASE: "/notifications",
    UNREAD_COUNT: "/notifications/unread-count",
    MARK_AS_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_AS_READ: "/notifications/read-all",
  },


} as const;