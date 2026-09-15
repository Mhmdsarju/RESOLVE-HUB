-- CreateTable
CREATE TABLE "WarRoomMessage" (
    "id" UUID NOT NULL,
    "warRoomId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WarRoomMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WarRoomMessage_warRoomId_createdAt_idx" ON "WarRoomMessage"("warRoomId", "createdAt");

-- CreateIndex
CREATE INDEX "WarRoomMessage_userId_idx" ON "WarRoomMessage"("userId");

-- AddForeignKey
ALTER TABLE "WarRoomMessage" ADD CONSTRAINT "WarRoomMessage_warRoomId_fkey" FOREIGN KEY ("warRoomId") REFERENCES "war_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarRoomMessage" ADD CONSTRAINT "WarRoomMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
