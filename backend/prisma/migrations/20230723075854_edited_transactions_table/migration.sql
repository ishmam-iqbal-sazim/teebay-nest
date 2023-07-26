/*
  Warnings:

  - You are about to drop the column `customerId` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_ownerId_fkey";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "customerId",
DROP COLUMN "ownerId",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
