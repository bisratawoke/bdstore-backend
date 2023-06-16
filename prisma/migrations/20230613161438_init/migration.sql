/*
  Warnings:

  - Added the required column `picture_url` to the `item` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "item" ADD COLUMN     "picture_url" TEXT NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
