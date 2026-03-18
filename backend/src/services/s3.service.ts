import dotenv from "dotenv";
dotenv.config();

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { CustomError } from "../utils/Errors";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;
const EXPIRES_IN = 3600;

export interface UploadResult {
  fileName: string;
  bucket: string;
  key: string;
  url: string,
  mimeType: string;
  size: number;
}

export const uploadFile = async (
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
  folderPath: string,
): Promise<UploadResult> => {
  try {
    const key = `${folderPath}/${Date.now()}-${fileName}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ContentType: mimeType,
        ACL: 'public-read',
        Metadata: {
          "original-name": fileName,
          "uploaded-at": new Date().toISOString(),
        },
      }),
    );

    const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;

    return {
      fileName,
      bucket: BUCKET_NAME,
      key,
      url,
      mimeType,
      size: fileBuffer.length,
    };
  } catch (error) {
    console.error("S3 upload error:", error);
    throw new CustomError(500, "Failed to upload file to S3");
  }
};

export const deleteFile = async (key: string): Promise<void> => {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }),
    );
  } catch (error) {
    console.error("S3 delete error:", error);
  }
};
