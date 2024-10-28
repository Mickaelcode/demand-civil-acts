-- CreateEnum
CREATE TYPE "Act" AS ENUM ('BORN', 'DEATH', 'WEDDING');

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Demand" (
    "id" SERIAL NOT NULL,
    "act_demand" "Act" NOT NULL,
    "email_user" TEXT NOT NULL,

    CONSTRAINT "Demand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_email_user_fkey" FOREIGN KEY ("email_user") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
