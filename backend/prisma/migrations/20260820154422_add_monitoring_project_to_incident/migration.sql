/*
  Warnings:

  - Added the required column `monitoringProjectId` to the `incidents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "incidents" ADD COLUMN     "monitoringProjectId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "incidents_monitoringProjectId_idx" ON "incidents"("monitoringProjectId");

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_monitoringProjectId_fkey" FOREIGN KEY ("monitoringProjectId") REFERENCES "monitoring_projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
