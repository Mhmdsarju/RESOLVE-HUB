-- CreateEnum
CREATE TYPE "OrganizationAccessStatus" AS ENUM ('ACTIVE', 'FROZEN');

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "accessStatus" "OrganizationAccessStatus" NOT NULL DEFAULT 'ACTIVE';
