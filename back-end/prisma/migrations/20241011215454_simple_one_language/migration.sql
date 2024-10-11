/*
  Warnings:

  - The values [Burmese,FRENCH,SPANISH] on the enum `Language` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Language_new" AS ENUM ('ENGLISH');
ALTER TABLE "UserPreference" ALTER COLUMN "preferredLanguage" TYPE "Language_new" USING ("preferredLanguage"::text::"Language_new");
ALTER TYPE "Language" RENAME TO "Language_old";
ALTER TYPE "Language_new" RENAME TO "Language";
DROP TYPE "Language_old";
COMMIT;
