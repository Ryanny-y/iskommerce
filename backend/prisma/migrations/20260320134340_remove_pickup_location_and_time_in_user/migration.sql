/*
  Warnings:

  - You are about to drop the column `pickupLocation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pickupNotes` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "pickupLocation",
DROP COLUMN "pickupNotes";
