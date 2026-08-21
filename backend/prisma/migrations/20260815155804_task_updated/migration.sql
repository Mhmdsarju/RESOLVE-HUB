-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('MANUAL', 'AUTOMATIC');

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "type" "TaskType" NOT NULL DEFAULT 'MANUAL';

-- CreateIndex
CREATE INDEX "tasks_type_idx" ON "tasks"("type");
