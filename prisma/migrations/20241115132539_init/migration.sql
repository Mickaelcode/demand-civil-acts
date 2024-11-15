/*
  Warnings:

  - The `paid` column on the `Demand` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Paid" AS ENUM ('NO', 'YES');

-- AlterTable
ALTER TABLE "Demand" DROP COLUMN "paid",
ADD COLUMN     "paid" "Paid" NOT NULL DEFAULT 'NO';
