/*
  Warnings:

  - You are about to drop the column `company` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `displayOrder` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `linkedIn` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `collaborationDetails` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `displayOrder` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `investmentStage` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioSize` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `websiteUrl` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `coFounders` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `currentStage` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `designation` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `displayOrder` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `dpiitNumber` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `ecosystemStage` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `founderName` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `founderPhotoUrl` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `fundingAmount` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `fundingStatus` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `govGrants` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `gstNumber` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `incubationDate` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `investmentRound` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `investors` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `iprStatus` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `isoCert` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `keyMetrics` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `linkedIn` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `marketTarget` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `problemSolved` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `products` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `registration` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `shortDesc` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `socialMedia` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `startupIndiaCert` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `supportReceived` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `tagline` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `teamMembers` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `techArea` on the `Startup` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Mentor_slug_key";

-- DropIndex
DROP INDEX "Partner_slug_key";

-- DropIndex
DROP INDEX "Startup_slug_key";

-- AlterTable
ALTER TABLE "Mentor" DROP COLUMN "company",
DROP COLUMN "displayOrder",
DROP COLUMN "linkedIn",
DROP COLUMN "photoUrl",
DROP COLUMN "slug",
DROP COLUMN "status",
ADD COLUMN     "achievements" JSONB,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "engagement" TEXT,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "initials" TEXT,
ADD COLUMN     "languages" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "mode" TEXT,
ADD COLUMN     "mtype" JSONB,
ADD COLUMN     "org" TEXT,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "sectors" TEXT,
ADD COLUMN     "support" JSONB,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "years" TEXT,
ALTER COLUMN "designation" DROP NOT NULL,
ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "publishState" SET DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "collaborationDetails",
DROP COLUMN "description",
DROP COLUMN "displayOrder",
DROP COLUMN "industry",
DROP COLUMN "investmentStage",
DROP COLUMN "logoUrl",
DROP COLUMN "portfolioSize",
DROP COLUMN "slug",
DROP COLUMN "status",
DROP COLUMN "websiteUrl",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "emoji" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "mou" JSONB,
ALTER COLUMN "type" SET DEFAULT 'CORPORATE';

-- AlterTable
ALTER TABLE "Startup" DROP COLUMN "category",
DROP COLUMN "coFounders",
DROP COLUMN "currentStage",
DROP COLUMN "description",
DROP COLUMN "designation",
DROP COLUMN "displayOrder",
DROP COLUMN "dpiitNumber",
DROP COLUMN "ecosystemStage",
DROP COLUMN "founderName",
DROP COLUMN "founderPhotoUrl",
DROP COLUMN "fundingAmount",
DROP COLUMN "fundingStatus",
DROP COLUMN "govGrants",
DROP COLUMN "gstNumber",
DROP COLUMN "incubationDate",
DROP COLUMN "investmentRound",
DROP COLUMN "investors",
DROP COLUMN "iprStatus",
DROP COLUMN "isoCert",
DROP COLUMN "keyMetrics",
DROP COLUMN "linkedIn",
DROP COLUMN "logoUrl",
DROP COLUMN "marketTarget",
DROP COLUMN "problemSolved",
DROP COLUMN "products",
DROP COLUMN "registration",
DROP COLUMN "shortDesc",
DROP COLUMN "slug",
DROP COLUMN "socialMedia",
DROP COLUMN "startupIndiaCert",
DROP COLUMN "status",
DROP COLUMN "supportReceived",
DROP COLUMN "tagline",
DROP COLUMN "teamMembers",
DROP COLUMN "techArea",
ADD COLUMN     "ecosystem" TEXT,
ADD COLUMN     "funding" JSONB,
ADD COLUMN     "logoEmoji" TEXT,
ADD COLUMN     "logoPath" TEXT,
ADD COLUMN     "market" TEXT,
ADD COLUMN     "mentors" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "problem" TEXT,
ADD COLUMN     "registered" TEXT,
ADD COLUMN     "regulatory" JSONB,
ADD COLUMN     "sector" TEXT,
ADD COLUMN     "stage" TEXT,
ADD COLUMN     "team" JSONB,
ADD COLUMN     "technology" TEXT,
ADD COLUMN     "traction" TEXT,
ALTER COLUMN "publishState" SET DEFAULT 'PUBLISHED';
