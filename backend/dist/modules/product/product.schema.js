"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDtoSchema = exports.productImageSchema = exports.sellerProductsParamsSchema = exports.productParamsSchema = exports.updateProductSchema = exports.createProductBodySchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const files_1 = require("../../types/files");
exports.createProductBodySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        description: zod_1.z.string().min(1),
        price: zod_1.z.coerce.number().min(0.01),
        stock: zod_1.z.coerce.number().min(1),
        categoryId: zod_1.z.uuid(),
        type: zod_1.z.enum(client_1.ItemType),
        // FOR FOOD
        food_notes: zod_1.z.string().optional(),
        allergen_info: zod_1.z.string().optional(),
        spicy_level: zod_1.z.enum(client_1.SpicyLevel).optional(),
        // FOR NON FOOD
        condition: zod_1.z.enum(client_1.ProductCondition).optional(),
    }),
    files: zod_1.z.array(files_1.uploadedFileSchema).min(1, "At least one image is required."),
});
exports.updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.coerce.number().positive().optional(),
        stock: zod_1.z.coerce.number().int().min(0).optional(),
        // FOR FOOD
        food_notes: zod_1.z.string().optional(),
        allergen_info: zod_1.z.string().optional(),
        spicy_level: zod_1.z.enum(client_1.SpicyLevel).optional(),
        // FOR NON_FOOD
        condition: zod_1.z.enum(client_1.ProductCondition).optional(),
    }),
    params: zod_1.z.object({
        productId: zod_1.z.uuid(),
    }),
});
exports.productParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        productId: zod_1.z.uuid(),
    }),
});
exports.sellerProductsParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        sellerId: zod_1.z.uuid(),
    }),
});
exports.productImageSchema = zod_1.z.object({
    key: zod_1.z.string(),
    fileName: zod_1.z.string(),
    bucket: zod_1.z.string(),
    url: zod_1.z.string(),
    mimeType: zod_1.z.string().optional(),
    size: zod_1.z.number().optional(),
});
exports.productDtoSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    stock: zod_1.z.number(),
    rating: zod_1.z.number(),
    // FOR FOOD
    food_notes: zod_1.z.string().optional(),
    allergen_info: zod_1.z.string().optional(),
    spicy_level: zod_1.z.string().optional(),
    // FOR NON FOOD
    condition: zod_1.z.string(),
    sellerId: zod_1.z.string(),
    seller: zod_1.z.string(),
    categoryId: zod_1.z.string(),
    category: zod_1.z.string(),
    images: zod_1.z.array(exports.productImageSchema),
    createdAt: zod_1.z.string(),
});
