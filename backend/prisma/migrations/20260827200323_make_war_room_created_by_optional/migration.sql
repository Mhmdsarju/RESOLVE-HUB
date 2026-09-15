-- DropForeignKey
ALTER TABLE "war_rooms" DROP CONSTRAINT "war_rooms_createdBy_fkey";

-- AlterTable
ALTER TABLE "war_rooms" ALTER COLUMN "createdBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "war_rooms" ADD CONSTRAINT "war_rooms_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
