/*
  Warnings:

  - You are about to drop the column `act_demand` on the `Demand` table. All the data in the column will be lost.
  - You are about to drop the column `email_admin` on the `Demand` table. All the data in the column will be lost.
  - You are about to drop the column `email_user` on the `Demand` table. All the data in the column will be lost.
  - Added the required column `actDemand` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attachment` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commune` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailAdmin` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailUser` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numACte` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeOfBirth` to the `Demand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Demand` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('EN_ATTENTE', 'REFUSE', 'ACCEPTE');

-- CreateEnum
CREATE TYPE "Province" AS ENUM ('ANTANANARIVO', 'FIANARANTSOA', 'TOAMASINA', 'MAHAJANGA', 'ANTSIRANANA', 'TOLIARA');

-- DropForeignKey
ALTER TABLE "Demand" DROP CONSTRAINT "Demand_email_admin_fkey";

-- DropForeignKey
ALTER TABLE "Demand" DROP CONSTRAINT "Demand_email_user_fkey";

-- AlterTable
ALTER TABLE "Demand" DROP COLUMN "act_demand",
DROP COLUMN "email_admin",
DROP COLUMN "email_user",
ADD COLUMN     "actDemand" "Act" NOT NULL,
ADD COLUMN     "attachment" TEXT NOT NULL,
ADD COLUMN     "commune" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "emailAdmin" TEXT NOT NULL,
ADD COLUMN     "emailUser" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "numACte" TEXT NOT NULL,
ADD COLUMN     "placeOfBirth" TEXT NOT NULL,
ADD COLUMN     "province" "Province" NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'EN_ATTENTE';

-- CreateTable
CREATE TABLE "Acte" (
    "numAct" TEXT NOT NULL,
    "typeActe" "Act" NOT NULL,
    "province" "Province" NOT NULL,
    "nameCommune" TEXT NOT NULL,
    "nameCit" TEXT NOT NULL,
    "firstNameCit" TEXT NOT NULL,
    "dateOB" TIMESTAMP(3) NOT NULL,
    "placeOB" TEXT NOT NULL,
    "delivrance" TIMESTAMP(3) NOT NULL,
    "father" TEXT NOT NULL,
    "mother" TEXT NOT NULL,
    "fileActe" TEXT NOT NULL,

    CONSTRAINT "Acte_pkey" PRIMARY KEY ("numAct")
);

-- CreateIndex
CREATE UNIQUE INDEX "Acte_numAct_key" ON "Acte"("numAct");

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_emailUser_fkey" FOREIGN KEY ("emailUser") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_emailAdmin_fkey" FOREIGN KEY ("emailAdmin") REFERENCES "Administrator"("email_admin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_numACte_fkey" FOREIGN KEY ("numACte") REFERENCES "Acte"("numAct") ON DELETE RESTRICT ON UPDATE CASCADE;
