/*
  Warnings:

  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "type" "ItemType" NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0;
