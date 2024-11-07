/*
  Warnings:

  - You are about to alter the column `attachment` on the `Demand` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Demand" ALTER COLUMN "attachment" SET DATA TYPE VARCHAR(255);
