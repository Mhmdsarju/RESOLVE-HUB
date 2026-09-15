-- CreateTable
CREATE TABLE "alert_routing_rules" (
    "id" TEXT NOT NULL,
    "organizationId" UUID NOT NULL,
    "monitoringProjectId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdBy" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "conditions" JSONB NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 100,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alert_routing_rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "alert_routing_rules_organizationId_idx" ON "alert_routing_rules"("organizationId");

-- CreateIndex
CREATE INDEX "alert_routing_rules_monitoringProjectId_idx" ON "alert_routing_rules"("monitoringProjectId");

-- CreateIndex
CREATE INDEX "alert_routing_rules_teamId_idx" ON "alert_routing_rules"("teamId");

-- CreateIndex
CREATE INDEX "alert_routing_rules_createdBy_idx" ON "alert_routing_rules"("createdBy");

-- CreateIndex
CREATE INDEX "alert_routing_rules_monitoringProjectId_isActive_priority_idx" ON "alert_routing_rules"("monitoringProjectId", "isActive", "priority");

-- AddForeignKey
ALTER TABLE "alert_routing_rules" ADD CONSTRAINT "alert_routing_rules_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_routing_rules" ADD CONSTRAINT "alert_routing_rules_monitoringProjectId_fkey" FOREIGN KEY ("monitoringProjectId") REFERENCES "monitoring_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_routing_rules" ADD CONSTRAINT "alert_routing_rules_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_routing_rules" ADD CONSTRAINT "alert_routing_rules_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
