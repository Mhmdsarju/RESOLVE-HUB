export const UserRole = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ORG_ADMIN: "ORG_ADMIN",
  ENGINEER: "ENGINEER",
} as const;

export type UserRole =
  (typeof UserRole)[keyof typeof UserRole];