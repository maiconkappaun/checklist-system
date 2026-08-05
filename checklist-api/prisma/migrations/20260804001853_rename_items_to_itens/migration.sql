/*
  Warnings:

  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "items";

-- CreateTable
CREATE TABLE "itens" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "itens_pkey" PRIMARY KEY ("id")
);
