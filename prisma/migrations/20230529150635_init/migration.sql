/*
  Warnings:

  - You are about to drop the column `product_catalog_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the `product_catalog` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `catalog_type` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_product_catalog_id_fkey";

-- DropForeignKey
ALTER TABLE "product_catalog" DROP CONSTRAINT "product_catalog_owner_id_fkey";

-- AlterTable
ALTER TABLE "item" DROP COLUMN "product_catalog_id",
ADD COLUMN     "catalog_type" "catelog_type" NOT NULL,
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "product_catalog";

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
