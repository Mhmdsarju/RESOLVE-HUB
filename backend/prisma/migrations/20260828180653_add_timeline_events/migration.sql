-- CreateEnum
CREATE TYPE "TimelineEventType" AS ENUM ('INCIDENT_CREATED', 'INCIDENT_STATUS_CHANGED', 'INCIDENT_UPDATED', 'TASK_CREATED', 'TASK_ASSIGNED', 'TASK_STATUS_CHANGED', 'TASK_COMPLETED', 'TASK_UPDATED', 'FILE_UPLOADED', 'FILE_DELETED', 'WAR_ROOM_CREATED', 'WAR_ROOM_JOINED', 'WAR_ROOM_LEFT', 'WAR_ROOM_CLOSED', 'INCIDENT_CREATED_FROM_ALERT');

-- CreateTable
CREATE TABLE "timeline_events" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "actorId" UUID,
    "eventType" "TimelineEventType" NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "timeline_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "timeline_events_incidentId_idx" ON "timeline_events"("incidentId");

-- CreateIndex
CREATE INDEX "timeline_events_actorId_idx" ON "timeline_events"("actorId");

-- CreateIndex
CREATE INDEX "timeline_events_createdAt_idx" ON "timeline_events"("createdAt");

-- AddForeignKey
ALTER TABLE "timeline_events" ADD CONSTRAINT "timeline_events_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "incidents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_events" ADD CONSTRAINT "timeline_events_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
