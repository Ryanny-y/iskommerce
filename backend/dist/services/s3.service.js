"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.uploadFile = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_s3_1 = require("@aws-sdk/client-s3");
const Errors_1 = require("../utils/Errors");
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const EXPIRES_IN = 3600;
const uploadFile = async (fileBuffer, fileName, mimeType, folderPath) => {
    try {
        const key = `${folderPath}/${Date.now()}-${fileName}`;
        await s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: fileBuffer,
            ContentType: mimeType,
            ACL: 'public-read',
            Metadata: {
                "original-name": fileName,
                "uploaded-at": new Date().toISOString(),
            },
        }));
        const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
        return {
            fileName,
            bucket: BUCKET_NAME,
            key,
            url,
            mimeType,
            size: fileBuffer.length,
        };
    }
    catch (error) {
        console.error("S3 upload error:", error);
        throw new Errors_1.CustomError(500, "Failed to upload file to S3");
    }
};
exports.uploadFile = uploadFile;
const deleteFile = async (key) => {
    try {
        await s3Client.send(new client_s3_1.DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        }));
    }
    catch (error) {
        console.error("S3 delete error:", error);
    }
};
exports.deleteFile = deleteFile;
