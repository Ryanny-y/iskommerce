import { Prisma } from "@prisma/client";
import prisma from "../../config/client";
import { uploadFile } from "../../services/s3.service";
import { mapProductToDto } from "./product.mapper";
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from "./product.types";

export const createProduct = async (
  sellerId: string,
  data: CreateProductDto,
  files: Express.Multer.File[],
): Promise<ProductDto> => {
  const createdProduct = await prisma.$transaction(async (tx) => {
    const newProduct = await tx.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        sellerId,
        categoryId: data.categoryId,
        type: data.type,
        food_notes: data.food_notes ?? null,
        allergen_info: data.allergen_info ?? null,
        spicy_level: data.spicy_level ?? null,
        condition: data.condition,
      },
    });

    for (const file of files) {
      // Upload to Google Drive
      const s3Result = await uploadFile(
        file.buffer,
        file.originalname,
        file.mimetype,
        `products/${sellerId}`,
      );

      await tx.productImage.create({
        data: {
          url: s3Result.url,
          fileName: s3Result.fileName,
          key: s3Result.key,
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
      },
    });
  });

  return mapProductToDto(createdProduct);
};

export const getSellerProducts = async (
  sellerId: string,
): Promise<ProductDto[]> => {
  const products = await prisma.product.findMany({
    where: {
      sellerId,
    },
    include: {
      images: true,
    },
  });

  return products.map((product) => mapProductToDto(product));
};

export const updateProduct = async (
  productId: string,
  data: UpdateProductDto,
): Promise<ProductDto> => {
  // Build Prisma-compatible update object
  const prismaData: Prisma.ProductUpdateInput = {};

  if (data.name !== undefined) prismaData.name = { set: data.name };
  if (data.description !== undefined) prismaData.description = { set: data.description };
  if (data.price !== undefined) prismaData.price = { set: data.price };
  if (data.stock !== undefined) prismaData.stock = { set: data.stock };
  if (data.food_notes !== undefined) prismaData.food_notes = { set: data.food_notes };
  if (data.allergen_info !== undefined) prismaData.allergen_info = { set: data.allergen_info };
  if (data.spicy_level !== undefined) prismaData.spicy_level = { set: data.spicy_level };
  if (data.condition !== undefined) prismaData.condition = { set: data.condition };

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: prismaData,
    include: { images: true },
  });

  return mapProductToDto(updatedProduct);
};

export const deleteProduct = async (productId: string) => {
  await prisma.product.delete({
    where: {
      id: productId,
    },
  });
};
