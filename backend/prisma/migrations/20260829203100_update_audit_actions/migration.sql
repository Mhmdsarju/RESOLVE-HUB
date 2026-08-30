/*
  Warnings:

  - The values [USER_DEACTIVATED,USER_REACTIVATED,USER_DELETED] on the enum `AuditAction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuditAction_new" AS ENUM ('LOGIN', 'LOGOUT', 'ORGANIZATION_UPDATED', 'ROLE_CHANGED', 'USER_CREATED', 'USER_UPDATED', 'USER_ADDED_TO_TEAM', 'USER_REMOVED_FROM_TEAM');
ALTER TABLE "audit_logs" ALTER COLUMN "action" TYPE "AuditAction_new" USING ("action"::text::"AuditAction_new");
ALTER TYPE "AuditAction" RENAME TO "AuditAction_old";
ALTER TYPE "AuditAction_new" RENAME TO "AuditAction";
DROP TYPE "public"."AuditAction_old";
COMMIT;
