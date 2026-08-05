/*
  Warnings:

  - You are about to drop the column `description` on the `itens` table. All the data in the column will be lost.
  - Added the required column `descricao` to the `itens` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChecklistStatus" AS ENUM ('RASCUNHO', 'PRONTO');

-- AlterTable
-- AlterTable
ALTER TABLE "itens"
RENAME COLUMN "description" TO "descricao";

-- CreateTable
CREATE TABLE "checklists" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "status" "ChecklistStatus" NOT NULL DEFAULT 'RASCUNHO',

    CONSTRAINT "checklists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checklist_itens" (
    "checklist_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,

    CONSTRAINT "checklist_itens_pkey" PRIMARY KEY ("checklist_id","item_id")
);

-- AddForeignKey
ALTER TABLE "checklist_itens" ADD CONSTRAINT "checklist_itens_checklist_id_fkey" FOREIGN KEY ("checklist_id") REFERENCES "checklists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklist_itens" ADD CONSTRAINT "checklist_itens_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "itens"("id") ON DELETE CASCADE ON UPDATE CASCADE;
