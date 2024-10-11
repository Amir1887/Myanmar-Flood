/*
  Warnings:

  - The values [SMS] on the enum `NotificationMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationMethod_new" AS ENUM ('EMAIL', 'APP_NOTIFICATION');
ALTER TABLE "UserPreference" ALTER COLUMN "notificationMethod" TYPE "NotificationMethod_new" USING ("notificationMethod"::text::"NotificationMethod_new");
ALTER TYPE "NotificationMethod" RENAME TO "NotificationMethod_old";
ALTER TYPE "NotificationMethod_new" RENAME TO "NotificationMethod";
DROP TYPE "NotificationMethod_old";
COMMIT;
