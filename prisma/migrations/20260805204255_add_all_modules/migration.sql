-- CreateTable
CREATE TABLE "Mou" (
    "id" SERIAL NOT NULL,
    "org" TEXT NOT NULL,
    "emoji" TEXT,
    "logo" TEXT,
    "link" TEXT,
    "status" TEXT,
    "number" TEXT,
    "title" TEXT,
    "date" TEXT,
    "effective" TEXT,
    "expiry" TEXT,
    "scope" JSONB,
    "benefits" JSONB,
    "activities" JSONB,
    "brief" TEXT,
    "objective" TEXT,
    "pdf" TEXT,
    "press" TEXT,
    "publishState" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mou_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scheme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "desc" TEXT,
    "objectives" TEXT,
    "eligibility" TEXT,
    "beneficiaries" JSONB,
    "providedBy" TEXT,
    "authority" TEXT,
    "type" TEXT,
    "installments" TEXT,
    "departments" JSONB,
    "category" JSONB,
    "sectors" JSONB,
    "budget" TEXT,
    "maxGrant" TEXT,
    "fundingType" TEXT,
    "duration" TEXT,
    "equityPct" TEXT,
    "apply" TEXT,
    "publishState" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vertical" (
    "id" SERIAL NOT NULL,
    "vid" TEXT,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "logoPath" TEXT,
    "backer" TEXT,
    "emoji" TEXT,
    "about" TEXT,
    "offerings" JSONB,
    "forWho" TEXT,
    "publishState" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vertical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lab" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "location" TEXT,
    "equipment" JSONB,
    "availability" TEXT,
    "bookingLink" TEXT,
    "images" JSONB,
    "publishState" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT,
    "category" TEXT,
    "content" TEXT,
    "link" TEXT,
    "image" TEXT,
    "publishState" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" SERIAL NOT NULL,
    "startupName" TEXT NOT NULL,
    "founder" TEXT,
    "challenge" TEXT,
    "solution" TEXT,
    "impact" JSONB,
    "quote" TEXT,
    "coverImage" TEXT,
    "publishState" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" SERIAL NOT NULL,
    "authorName" TEXT NOT NULL,
    "designation" TEXT,
    "organization" TEXT,
    "quote" TEXT,
    "photo" TEXT,
    "rating" INTEGER,
    "publishState" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Org" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "logo" TEXT,
    "website" TEXT,
    "description" TEXT,
    "contact" JSONB,
    "publishState" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);
