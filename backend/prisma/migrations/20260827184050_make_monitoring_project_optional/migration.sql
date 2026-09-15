-- DropForeignKey
ALTER TABLE "incidents" DROP CONSTRAINT "incidents_monitoringProjectId_fkey";

-- AlterTable
ALTER TABLE "incidents" ALTER COLUMN "monitoringProjectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_monitoringProjectId_fkey" FOREIGN KEY ("monitoringProjectId") REFERENCES "monitoring_projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
