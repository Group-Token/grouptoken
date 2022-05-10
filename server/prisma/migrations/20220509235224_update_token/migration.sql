/*
  Warnings:

  - You are about to drop the column `adminTokenId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `tokenAddress` on the `Token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_adminTokenId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_ownerId_fkey";

-- DropIndex
DROP INDEX "Group_adminTokenId_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "adminTokenId",
ADD COLUMN     "ownerId" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "ownerId",
DROP COLUMN "tokenAddress",
ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Token_address_key" ON "Token"("address");

-- CreateIndex
CREATE UNIQUE INDEX "User_publicKey_key" ON "User"("publicKey");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
