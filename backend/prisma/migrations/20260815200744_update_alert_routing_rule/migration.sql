/*
  Warnings:

  - You are about to drop the column `conditions` on the `alert_routing_rules` table. All the data in the column will be lost.
  - Added the required column `alertRuleId` to the `alert_routing_rules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "alert_routing_rules" DROP COLUMN "conditions",
ADD COLUMN     "alertRuleId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "alert_routing_rules_alertRuleId_idx" ON "alert_routing_rules"("alertRuleId");

-- AddForeignKey
ALTER TABLE "alert_routing_rules" ADD CONSTRAINT "alert_routing_rules_alertRuleId_fkey" FOREIGN KEY ("alertRuleId") REFERENCES "alert_rules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
