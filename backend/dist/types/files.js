"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadedFileSchema = exports.fileSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.fileSchema = zod_1.default.object({
    id: zod_1.default.string(),
    fileName: zod_1.default.string(),
    bucket: zod_1.default.string(),
    url: zod_1.default.string(),
    key: zod_1.default.string(),
    mimeType: zod_1.default.string(),
    size: zod_1.default.number(),
});
exports.uploadedFileSchema = zod_1.default.object({
    originalname: zod_1.default.string(),
    mimetype: zod_1.default.string(),
    buffer: zod_1.default.instanceof(Buffer),
    size: zod_1.default.number(),
});
