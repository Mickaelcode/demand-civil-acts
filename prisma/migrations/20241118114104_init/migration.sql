/*
  Warnings:

  - The `attachment` column on the `Demand` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Demand" DROP COLUMN "attachment",
ADD COLUMN     "attachment" TEXT[];
