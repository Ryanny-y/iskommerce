-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationCodeExpires" TIMESTAMP(3),
ADD COLUMN     "verificationCodeHash" TEXT;
