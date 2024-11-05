-- AlterTable
ALTER TABLE "Demand" ALTER COLUMN "emailAdmin" SET DEFAULT 'mika@gmail.com';

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_numACte_fkey" FOREIGN KEY ("numACte") REFERENCES "Acte"("numAct") ON DELETE RESTRICT ON UPDATE CASCADE;
