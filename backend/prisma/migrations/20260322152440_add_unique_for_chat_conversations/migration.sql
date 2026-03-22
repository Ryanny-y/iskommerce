/*
  Warnings:

  - A unique constraint covering the columns `[buyerId,sellerId]` on the table `ChatConversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChatConversation_buyerId_sellerId_key" ON "ChatConversation"("buyerId", "sellerId");
