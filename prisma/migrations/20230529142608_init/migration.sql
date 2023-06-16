/*
  Warnings:

  - You are about to drop the column `item_type` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the `broker` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_catalog_id` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "item_status" AS ENUM ('AVAILABLE', 'SOLD', 'REMOVED');

-- CreateEnum
CREATE TYPE "catelog_type" AS ENUM ('CAR', 'HOUSE', 'COSMOTICS', 'TECHNOLOGY', 'CLOTHING', 'OTHER');

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_owner_id_fkey";

-- AlterTable
ALTER TABLE "item" DROP COLUMN "item_type",
DROP COLUMN "owner_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "product_catalog_id" TEXT NOT NULL,
ADD COLUMN     "status" "item_status" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "broker";

-- DropEnum
DROP TYPE "item_type";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_catalog" (
    "id" TEXT NOT NULL,
    "catalog_type" "catelog_type" NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "product_catalog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "product_catalog" ADD CONSTRAINT "product_catalog_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_product_catalog_id_fkey" FOREIGN KEY ("product_catalog_id") REFERENCES "product_catalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
