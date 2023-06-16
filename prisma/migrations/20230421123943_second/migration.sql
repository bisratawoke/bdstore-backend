/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `broker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner_id]` on the table `item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "broker_email_key" ON "broker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "item_owner_id_key" ON "item"("owner_id");
