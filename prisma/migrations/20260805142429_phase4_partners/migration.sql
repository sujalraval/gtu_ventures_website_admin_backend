-- CreateEnum
CREATE TYPE "PartnerType" AS ENUM ('CORPORATE', 'ECOSYSTEM', 'ACADEMIC', 'INVESTOR');

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "PartnerType" NOT NULL,
    "logoUrl" TEXT,
    "description" TEXT NOT NULL,
    "industry" TEXT,
    "websiteUrl" TEXT,
    "investmentStage" TEXT,
    "portfolioSize" TEXT,
    "collaborationDetails" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "publishState" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partner_slug_key" ON "Partner"("slug");
