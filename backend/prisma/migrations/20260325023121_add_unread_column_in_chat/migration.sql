/*
  Warnings:

  - You are about to drop the column `isRead` on the `ChatConversation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChatConversation" DROP COLUMN "isRead";

-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false;
