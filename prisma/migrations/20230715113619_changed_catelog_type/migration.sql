/*
  Warnings:

  - The values [CAR,HOUSE,COSMOTICS,TECHNOLOGY,CLOTHING,OTHER,SHOES] on the enum `catelog_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "catelog_type_new" AS ENUM ('Car', 'House', 'Cosmotics', 'Technology', 'Clothing', 'Other', 'Shoes');
ALTER TABLE "item" ALTER COLUMN "catalog_type" TYPE "catelog_type_new" USING ("catalog_type"::text::"catelog_type_new");
ALTER TYPE "catelog_type" RENAME TO "catelog_type_old";
ALTER TYPE "catelog_type_new" RENAME TO "catelog_type";
DROP TYPE "catelog_type_old";
COMMIT;
