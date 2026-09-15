/*
  Warnings:

  - Added the required column `updatedAt` to the `alert_rules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "alert_rules" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isPredefined" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "alert_rules_organizationId_idx" ON "alert_rules"("organizationId");

-- CreateIndex
CREATE INDEX "alert_rules_monitoringProjectId_isActive_idx" ON "alert_rules"("monitoringProjectId", "isActive");
