/*
  Warnings:

  - You are about to drop the `Meets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meets" DROP CONSTRAINT "Meets_creatorId_fkey";

-- DropTable
DROP TABLE "Meets";

-- CreateTable
CREATE TABLE "meets" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meetStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,
    "slug" INTEGER NOT NULL,

    CONSTRAINT "meets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "meets_creatorId_idx" ON "meets"("creatorId");

-- AddForeignKey
ALTER TABLE "meets" ADD CONSTRAINT "meets_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
