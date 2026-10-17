-- AlterTable
ALTER TABLE "user" ADD COLUMN     "activePersonId" TEXT;

-- CreateTable
CREATE TABLE "person" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "person_userId_idx" ON "person"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_activePersonId_key" ON "user"("activePersonId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_activePersonId_fkey" FOREIGN KEY ("activePersonId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;


INSERT INTO "person" ("id", "name", "userId", "updatedAt")
SELECT uuidv7()::text, "name", "id", CURRENT_TIMESTAMP FROM "user";

UPDATE "user" SET "activePersonId" = "person"."id" FROM "person" WHERE "person"."userId" = "user"."id";
