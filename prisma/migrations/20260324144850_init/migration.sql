-- CreateTable
CREATE TABLE "Meets" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meetStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,
    "slug" INTEGER NOT NULL,

    CONSTRAINT "Meets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Meets_creatorId_idx" ON "Meets"("creatorId");

-- AddForeignKey
ALTER TABLE "Meets" ADD CONSTRAINT "Meets_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
