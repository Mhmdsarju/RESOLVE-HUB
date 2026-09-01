-- CreateEnum
CREATE TYPE "WarRoomStatus" AS ENUM ('ACTIVE', 'CLOSED');

-- CreateTable
CREATE TABLE "war_rooms" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "createdBy" UUID NOT NULL,
    "status" "WarRoomStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "closedAt" TIMESTAMP(3),

    CONSTRAINT "war_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "war_rooms_incidentId_key" ON "war_rooms"("incidentId");

-- CreateIndex
CREATE INDEX "war_rooms_createdBy_idx" ON "war_rooms"("createdBy");

-- CreateIndex
CREATE INDEX "war_rooms_status_idx" ON "war_rooms"("status");

-- AddForeignKey
ALTER TABLE "war_rooms" ADD CONSTRAINT "war_rooms_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "incidents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "war_rooms" ADD CONSTRAINT "war_rooms_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
