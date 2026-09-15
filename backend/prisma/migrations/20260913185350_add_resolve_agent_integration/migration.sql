/*
  Warnings:

  - The values [GRAFANA,WEBHOOK] on the enum `IntegrationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "IntegrationType_new" AS ENUM ('PROMETHEUS', 'RESOLVE_AGENT');
ALTER TABLE "integrations" ALTER COLUMN "type" TYPE "IntegrationType_new" USING ("type"::text::"IntegrationType_new");
ALTER TYPE "IntegrationType" RENAME TO "IntegrationType_old";
ALTER TYPE "IntegrationType_new" RENAME TO "IntegrationType";
DROP TYPE "public"."IntegrationType_old";
COMMIT;
