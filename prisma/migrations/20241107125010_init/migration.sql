/*
  Warnings:

  - You are about to drop the column `numACte` on the `Demand` table. All the data in the column will be lost.
  - Added the required column `numActe` to the `Demand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Demand" DROP COLUMN "numACte",
ADD COLUMN     "numActe" TEXT NOT NULL,
ALTER COLUMN "emailAdmin" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_emailUser_fkey" FOREIGN KEY ("emailUser") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_emailAdmin_fkey" FOREIGN KEY ("emailAdmin") REFERENCES "Administrator"("email_admin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_numActe_fkey" FOREIGN KEY ("numActe") REFERENCES "Acte"("numAct") ON DELETE RESTRICT ON UPDATE CASCADE;
