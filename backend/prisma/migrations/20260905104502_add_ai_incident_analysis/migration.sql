-- CreateTable
CREATE TABLE "ai_incident_analyses" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "organizationId" UUID NOT NULL,
    "summary" TEXT NOT NULL,
    "possibleRootCause" TEXT NOT NULL,
    "initialRecommendation" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "promptVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_incident_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_incident_analyses_incidentId_idx" ON "ai_incident_analyses"("incidentId");

-- CreateIndex
CREATE INDEX "ai_incident_analyses_organizationId_idx" ON "ai_incident_analyses"("organizationId");

-- CreateIndex
CREATE INDEX "ai_incident_analyses_organizationId_incidentId_idx" ON "ai_incident_analyses"("organizationId", "incidentId");

-- AddForeignKey
ALTER TABLE "ai_incident_analyses" ADD CONSTRAINT "ai_incident_analyses_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "incidents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_incident_analyses" ADD CONSTRAINT "ai_incident_analyses_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
