/*
  Warnings:

  - The values [INACTIVE] on the enum `OrganizationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "OrganizationVerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
BEGIN;
CREATE TYPE "OrganizationStatus_new" AS ENUM ('PENDING_PROFILE', 'PENDING_VERIFICATION', 'ACTIVE', 'REJECTED', 'SUSPENDED');
ALTER TABLE "public"."organizations" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "organizations" ALTER COLUMN "status" TYPE "OrganizationStatus_new" USING ("status"::text::"OrganizationStatus_new");
ALTER TYPE "OrganizationStatus" RENAME TO "OrganizationStatus_old";
ALTER TYPE "OrganizationStatus_new" RENAME TO "OrganizationStatus";
DROP TYPE "public"."OrganizationStatus_old";
ALTER TABLE "organizations" ALTER COLUMN "status" SET DEFAULT 'PENDING_PROFILE';
COMMIT;

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PENDING_PROFILE';

-- CreateTable
CREATE TABLE "organization_verifications" (
    "id" TEXT NOT NULL,
    "organizationId" UUID NOT NULL,
    "reviewedBy" UUID,
    "status" "OrganizationVerificationStatus" NOT NULL,
    "rejectionReason" TEXT,
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "organization_verifications_organizationId_idx" ON "organization_verifications"("organizationId");

-- CreateIndex
CREATE INDEX "organization_verifications_reviewedBy_idx" ON "organization_verifications"("reviewedBy");

-- CreateIndex
CREATE INDEX "organization_verifications_status_idx" ON "organization_verifications"("status");

-- AddForeignKey
ALTER TABLE "organization_verifications" ADD CONSTRAINT "organization_verifications_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_verifications" ADD CONSTRAINT "organization_verifications_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
