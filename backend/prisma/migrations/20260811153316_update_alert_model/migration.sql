/*
  Warnings:

  - You are about to drop the `Alert` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AlertSource" AS ENUM ('MANUAL', 'AUTOMATIC');

-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_incidentId_fkey";

-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_integrationId_fkey";

-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_monitoringProjectId_fkey";

-- DropTable
DROP TABLE "Alert";

-- CreateTable
CREATE TABLE "alerts" (
    "id" TEXT NOT NULL,
    "organizationId" UUID NOT NULL,
    "monitoringProjectId" TEXT NOT NULL,
    "integrationId" TEXT,
    "createdBy" TEXT,
    "source" "AlertSource" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT,
    "status" "AlertStatus" NOT NULL,
    "payload" JSONB NOT NULL,
    "incidentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "alerts_organizationId_idx" ON "alerts"("organizationId");

-- CreateIndex
CREATE INDEX "alerts_monitoringProjectId_idx" ON "alerts"("monitoringProjectId");

-- CreateIndex
CREATE INDEX "alerts_integrationId_idx" ON "alerts"("integrationId");

-- CreateIndex
CREATE INDEX "alerts_incidentId_idx" ON "alerts"("incidentId");

-- CreateIndex
CREATE INDEX "alerts_monitoringProjectId_status_idx" ON "alerts"("monitoringProjectId", "status");

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_monitoringProjectId_fkey" FOREIGN KEY ("monitoringProjectId") REFERENCES "monitoring_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "integrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "incidents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
