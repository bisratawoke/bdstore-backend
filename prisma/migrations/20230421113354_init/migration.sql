-- CreateEnum
CREATE TYPE "item_type" AS ENUM ('CAR', 'HOUSE', 'COSMOTICS', 'TECHNOLOGY', 'OTHER');

-- CreateTable
CREATE TABLE "broker" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,

    CONSTRAINT "broker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "item_type" "item_type" NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "broker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
