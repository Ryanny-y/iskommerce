"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getAllProducts = exports.updateProduct = exports.getSellerProducts = exports.createProduct = void 0;
const client_1 = __importDefault(require("../../config/client"));
const s3_service_1 = require("../../services/s3.service");
const product_mapper_1 = require("./product.mapper");
const createProduct = async (sellerId, data, files) => {
    const createdProduct = await client_1.default.$transaction(async (tx) => {
        const newProduct = await tx.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: Number(data.price),
                stock: Number(data.stock),
                sellerId,
                categoryId: data.categoryId,
                type: data.type,
                food_notes: data.food_notes ?? null,
                allergen_info: data.allergen_info ?? null,
                spicy_level: data.spicy_level ?? null,
                condition: data.condition ?? null,
            },
        });
        for (const file of files) {
            // Upload to Google Drive
            const s3Result = await (0, s3_service_1.uploadFile)(file.buffer, file.originalname, file.mimetype, `products/${sellerId}`);
            await tx.productImage.create({
                data: {
                    fileName: s3Result.fileName,
                    key: s3Result.key,
                    url: s3Result.url,
                    bucket: s3Result.bucket,
                    mimeType: s3Result.mimeType,
                    size: s3Result.size,
                    productId: newProduct.id,
                },
            });
        }
        return tx.product.findUnique({
            where: { id: newProduct.id },
            include: {
                images: true,
                seller: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    });
    return (0, product_mapper_1.mapProductToDto)(createdProduct);
};
exports.createProduct = createProduct;
const getSellerProducts = async (sellerId) => {
    const products = await client_1.default.product.findMany({
        where: {
            sellerId,
        },
        include: {
            images: true,
            seller: {
                select: {
                    id: true,
                    fullName: true,
                },
            },
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return products.map((product) => (0, product_mapper_1.mapProductToDto)(product));
};
exports.getSellerProducts = getSellerProducts;
const updateProduct = async (productId, data) => {
    // Build Prisma-compatible update object
    const prismaData = {};
    if (data.name !== undefined)
        prismaData.name = { set: data.name };
    if (data.description !== undefined)
        prismaData.description = { set: data.description };
    if (data.price !== undefined)
        prismaData.price = { set: data.price };
    if (data.stock !== undefined)
        prismaData.stock = { set: data.stock };
    if (data.food_notes !== undefined)
        prismaData.food_notes = { set: data.food_notes };
    if (data.allergen_info !== undefined)
        prismaData.allergen_info = { set: data.allergen_info };
    if (data.spicy_level !== undefined)
        prismaData.spicy_level = { set: data.spicy_level };
    if (data.condition !== undefined)
        prismaData.condition = { set: data.condition };
    const updatedProduct = await client_1.default.product.update({
        where: { id: productId },
        data: prismaData,
        include: {
            images: true,
            seller: {
                select: {
                    id: true,
                    fullName: true,
                },
            },
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return (0, product_mapper_1.mapProductToDto)(updatedProduct);
};
exports.updateProduct = updateProduct;
const getAllProducts = async () => {
    const products = await client_1.default.product.findMany({
        include: {
            images: true,
            seller: {
                select: {
                    id: true,
                    fullName: true,
                },
            },
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return products.map((product) => (0, product_mapper_1.mapProductToDto)(product));
};
exports.getAllProducts = getAllProducts;
const deleteProduct = async (userId, productId) => {
    const product = await client_1.default.product.findUnique({
        where: { id: productId },
        include: { images: true },
    });
    if (!product || product.sellerId !== userId) {
        throw new Error("Product not found or unauthorized");
    }
    try {
        await client_1.default.$transaction(async (tx) => {
            await Promise.all(product.images.map(img => (0, s3_service_1.deleteFile)(img.key)));
            await tx.product.delete({ where: { id: productId } });
        });
    }
    catch (err) {
        console.error("Failed to delete product:", err);
        throw new Error("Failed to delete product");
    }
};
exports.deleteProduct = deleteProduct;
