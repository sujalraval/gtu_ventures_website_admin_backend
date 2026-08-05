-- CreateTable
CREATE TABLE "Mentor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "expertise" JSONB,
    "linkedIn" TEXT,
    "photoUrl" TEXT,
    "bio" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "publishState" TEXT NOT NULL DEFAULT 'DRAFT',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_slug_key" ON "Mentor"("slug");
