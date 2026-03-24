/*
  Warnings:

  - You are about to drop the column `color` on the `account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "account" DROP COLUMN "color";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "color" TEXT;
