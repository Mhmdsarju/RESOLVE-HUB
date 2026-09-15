/*
  Warnings:

  - Added the required column `planId` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "planId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "payments_planId_idx" ON "payments"("planId");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
