import z from "zod";

export const fileSchema = z.object({
  id: z.string(),
  fileName: z.string(),
  bucket: z.string(),
  url: z.string(),
  key: z.string(),
  mimeType: z.string(),
  size: z.number(),
});

export const uploadedFileSchema = z.object({
  originalname: z.string(),
  mimetype: z.string(),
  buffer: z.instanceof(Buffer),
  size: z.number(),
});
