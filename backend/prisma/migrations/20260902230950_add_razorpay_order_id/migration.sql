/*
  Warnings:

  - A unique constraint covering the columns `[razorpayOrderId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `razorpayOrderId` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "razorpayOrderId" TEXT NOT NULL,
ALTER COLUMN "transactionId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payments_razorpayOrderId_key" ON "payments"("razorpayOrderId");
