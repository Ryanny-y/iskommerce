"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapProductToDto = void 0;
const client_1 = require("@prisma/client/runtime/client");
const product_schema_1 = require("./product.schema");
const Errors_1 = require("../../utils/Errors");
const mapProductToDto = (product) => {
    if (!product)
        throw new Errors_1.CustomError(404, "Product not found");
    return product_schema_1.productDtoSchema.parse({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        rating: product.rating instanceof client_1.Decimal ? product.rating.toNumber() : product.rating,
        // FOOD fields
        food_notes: product.food_notes ?? undefined,
        allergen_info: product.allergen_info ?? undefined,
        spicy_level: product.spicy_level ?? undefined,
        // NON-FOOD field
        condition: product.condition ?? "",
        sellerId: product.sellerId,
        seller: product.seller.fullName,
        categoryId: product.category.id,
        category: product.category.name,
        images: product.images.map((img) => product_schema_1.productImageSchema.parse({
            key: img.key,
            fileName: img.fileName,
            bucket: img.bucket,
            url: img.url,
            mimeType: img.mimeType ?? undefined,
            size: img.size ?? undefined,
        })),
        createdAt: product.createdAt.toISOString(),
    });
};
exports.mapProductToDto = mapProductToDto;
