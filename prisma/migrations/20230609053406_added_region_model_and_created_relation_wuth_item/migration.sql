/*
  Warnings:

  - A unique constraint covering the columns `[region_name]` on the table `item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `region_name` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item" ADD COLUMN     "region_name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "region" (
    "name" TEXT NOT NULL,
    "picture_url" TEXT NOT NULL,

    CONSTRAINT "region_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_region_name_key" ON "item"("region_name");

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_region_name_fkey" FOREIGN KEY ("region_name") REFERENCES "region"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
