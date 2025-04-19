/*
  Warnings:

  - You are about to drop the column `amount` on the `PaymentHistory` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "PaymentHistory" DROP COLUMN "amount",
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING';
