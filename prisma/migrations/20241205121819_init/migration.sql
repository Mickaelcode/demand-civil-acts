-- CreateEnum
CREATE TYPE "Act" AS ENUM ('BORN', 'DEATH', 'WEDDING');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('EN_ATTENTE', 'REFUSE', 'ACCEPTE');

-- CreateEnum
CREATE TYPE "Paid" AS ENUM ('NO', 'YES');

-- CreateEnum
CREATE TYPE "Province" AS ENUM ('ANTANANARIVO', 'FIANARANTSOA', 'TOAMASINA', 'MAHAJANGA', 'ANTSIRANANA', 'TOLIARA');

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
    "actDemand" "Act" NOT NULL,
    "emailAdmin" TEXT NOT NULL DEFAULT '',
    "emailUser" TEXT NOT NULL,
    "numActe" TEXT NOT NULL,
    "province" "Province" NOT NULL,
    "commune" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "attachment" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'EN_ATTENTE',
    "paid" "Paid" NOT NULL DEFAULT 'NO',

    CONSTRAINT "Demand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrator" (
    "email_admin" TEXT NOT NULL,
    "name_admin" TEXT NOT NULL,
    "first_name_admin" TEXT NOT NULL,
    "password_admin" TEXT NOT NULL
);

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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_email_admin_key" ON "Administrator"("email_admin");

-- CreateIndex
CREATE UNIQUE INDEX "Acte_numAct_key" ON "Acte"("numAct");

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_emailUser_fkey" FOREIGN KEY ("emailUser") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_emailAdmin_fkey" FOREIGN KEY ("emailAdmin") REFERENCES "Administrator"("email_admin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_numActe_fkey" FOREIGN KEY ("numActe") REFERENCES "Acte"("numAct") ON DELETE RESTRICT ON UPDATE CASCADE;
