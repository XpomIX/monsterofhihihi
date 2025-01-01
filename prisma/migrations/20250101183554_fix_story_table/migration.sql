/*
  Warnings:

  - Made the column `question` on table `Story` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Story" ALTER COLUMN "question" SET NOT NULL;
