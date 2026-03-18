/*
  Warnings:

  - You are about to drop the column `url` on the `ProductImage` table. All the data in the column will be lost.
  - Added the required column `bucket` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Made the column `mimeType` on table `ProductImage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `ProductImage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "url",
ADD COLUMN     "bucket" TEXT NOT NULL,
ALTER COLUMN "mimeType" SET NOT NULL,
ALTER COLUMN "size" SET NOT NULL;
