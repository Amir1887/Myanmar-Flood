-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_organizationId_fkey";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
