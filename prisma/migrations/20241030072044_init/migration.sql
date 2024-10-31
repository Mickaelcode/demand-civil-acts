/*
  Warnings:

  - Added the required column `email_admin` to the `Demand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Demand" ADD COLUMN     "email_admin" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Administrator" (
    "email_admin" TEXT NOT NULL,
    "name_admin" TEXT NOT NULL,
    "first_name_admin" TEXT NOT NULL,
    "password_admin" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_email_admin_key" ON "Administrator"("email_admin");

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_email_admin_fkey" FOREIGN KEY ("email_admin") REFERENCES "Administrator"("email_admin") ON DELETE RESTRICT ON UPDATE CASCADE;
