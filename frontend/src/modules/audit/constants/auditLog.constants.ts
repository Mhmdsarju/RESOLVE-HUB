import type {
  AuditAction,
  AuditEntityType,
} from "../types/auditLog.types";

export const AUDIT_ENTITY_OPTIONS: AuditEntityType[] = [
  "AUTH",
  "ORGANIZATION",
  "USER",
  "TEAM",
  "INCIDENT",
  "TASK",
];

export const AUDIT_ACTION_OPTIONS: AuditAction[] = [
  "LOGIN",
  "LOGOUT",
  "ORGANIZATION_UPDATED",
  "ROLE_CHANGED",
  "USER_CREATED",
  "USER_UPDATED",
  "USER_ADDED_TO_TEAM",
  "USER_REMOVED_FROM_TEAM",
];