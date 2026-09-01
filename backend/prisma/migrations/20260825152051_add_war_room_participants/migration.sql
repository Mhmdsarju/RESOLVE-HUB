-- CreateTable
CREATE TABLE "WarRoomParticipant" (
    "id" TEXT NOT NULL,
    "warRoomId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),

    CONSTRAINT "WarRoomParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WarRoomParticipant_warRoomId_idx" ON "WarRoomParticipant"("warRoomId");

-- CreateIndex
CREATE INDEX "WarRoomParticipant_userId_idx" ON "WarRoomParticipant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WarRoomParticipant_warRoomId_userId_key" ON "WarRoomParticipant"("warRoomId", "userId");

-- AddForeignKey
ALTER TABLE "WarRoomParticipant" ADD CONSTRAINT "WarRoomParticipant_warRoomId_fkey" FOREIGN KEY ("warRoomId") REFERENCES "war_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarRoomParticipant" ADD CONSTRAINT "WarRoomParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
