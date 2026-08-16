-- AlterTable
ALTER TABLE "alerts" ADD COLUMN     "alertRuleId" TEXT;

-- CreateIndex
CREATE INDEX "alerts_alertRuleId_idx" ON "alerts"("alertRuleId");

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_alertRuleId_fkey" FOREIGN KEY ("alertRuleId") REFERENCES "alert_rules"("id") ON DELETE SET NULL ON UPDATE CASCADE;
