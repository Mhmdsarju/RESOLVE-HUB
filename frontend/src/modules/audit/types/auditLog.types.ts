export type AuditAction =

  | "LOGIN"

  | "LOGOUT"

  | "ORGANIZATION_UPDATED"

  | "ROLE_CHANGED"

  | "USER_CREATED"

  | "USER_UPDATED"

  | "USER_ADDED_TO_TEAM"

  | "USER_REMOVED_FROM_TEAM";

export type AuditEntityType =

  | "AUTH"

  | "ORGANIZATION"

  | "USER"

  | "TEAM"

  | "INCIDENT"

  | "TASK";

export interface AuditLog {

  id: string;

  organizationId: string;

  actorId?: string | null;

  action: AuditAction;

  entityType: AuditEntityType;

  entityId?: string | null;

  description: string;

  metadata?: Record<string, unknown> | null;

  createdAt: string;

}

export interface GetAuditLogsParams {

  page?: number;

  limit?: number;

  search?: string;

  action?: AuditAction;

  entityType?: AuditEntityType;

}

export interface GetAuditLogsResponse {

  data: AuditLog[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;

}