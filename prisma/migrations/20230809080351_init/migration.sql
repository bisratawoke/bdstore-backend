-- AlterTable
ALTER TABLE "item" ADD COLUMN     "picture" TEXT,
ALTER COLUMN "picture_url" DROP NOT NULL;
