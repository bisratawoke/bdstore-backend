-- AlterEnum
ALTER TYPE "item_type" ADD VALUE 'CLOTHING';

-- AlterTable
ALTER TABLE "broker" ALTER COLUMN "phone_number" DROP NOT NULL;
