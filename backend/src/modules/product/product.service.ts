import { Prisma } from "@prisma/client";
import prisma from "../../config/client";
import { deleteFile, uploadFile } from "../../services/s3.service";
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
    let categoryId = data.categoryId;

    const foundCategory = await prisma.category.findUnique({
      where: {
        id: data.categoryId,
      },
    });

    if (!foundCategory) {
      if (data.categoryId === "OTHER" && data.newCategoryName) {
        const newCategory = await tx.category.create({
          data: {
            name: data.newCategoryName,
          },
          select: {
            id: true,
          },
        });

        categoryId = newCategory.id;
      } else {
        throw new Error("Invalid categoryId");
      }
    }

    const newProduct = await tx.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        sellerId,
        categoryId,
        type: data.type,
        food_notes: data.food_notes ?? null,
        allergen_info: data.allergen_info ?? null,
        spicy_level: data.spicy_level ?? null,
        condition: data.condition ?? null,
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

  return products.map((product) => mapProductToDto(product));
};

export const updateProduct = async (
  productId: string,
  data: UpdateProductDto,
): Promise<ProductDto> => {
  const updatedProduct = await prisma.$transaction(async (tx) => {
    let prismaData: Prisma.ProductUpdateInput = {};

    if (data.name !== undefined) prismaData.name = { set: data.name };
    if (data.description !== undefined)
      prismaData.description = { set: data.description };
    if (data.type !== undefined) prismaData.type = { set: data.type };
    if (data.price !== undefined)
      prismaData.price = { set: Number(data.price) };
    if (data.stock !== undefined)
      prismaData.stock = { set: Number(data.stock) };

    if (data.food_notes !== undefined)
      prismaData.food_notes = { set: data.food_notes };
    if (data.allergen_info !== undefined)
      prismaData.allergen_info = { set: data.allergen_info };
    if (data.spicy_level !== undefined)
      prismaData.spicy_level = { set: data.spicy_level };

    if (data.condition !== undefined)
      prismaData.condition = { set: data.condition };

    if (data.type === "FOOD") {
      prismaData.condition = { set: null };
    } else if (data.type === "NON_FOOD") {
      prismaData.food_notes = { set: null };
      prismaData.allergen_info = { set: null };
      prismaData.spicy_level = { set: null };

      if (!data.condition) prismaData.condition = { set: "NEW" };
    }

    if (data.categoryId !== undefined) {
      let categoryId = data.categoryId;

      const foundCategory = await tx.category.findUnique({
        where: { id: data.categoryId },
      });

      if (!foundCategory) {
        if (data.categoryId === "OTHER" && data.newCategoryName) {
          const newCategory = await tx.category.create({
            data: { name: data.newCategoryName },
          });
          categoryId = newCategory.id;
        } else {
          throw new Error("Invalid categoryId");
        }
      }

      prismaData.category = { connect: { id: categoryId } };
    }

    const product = await tx.product.update({
      where: { id: productId },
      data: prismaData,
      include: {
        images: true,
        seller: { select: { id: true, fullName: true } },
        category: { select: { id: true, name: true } },
      },
    });

    return product;
  });

  return mapProductToDto(updatedProduct);
};

export const getAllProducts = async (): Promise<ProductDto[]> => {
  const products = await prisma.product.findMany({
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

  return products.map((product) => mapProductToDto(product));
};

export const getProductById = async (id: string): Promise<ProductDto> => {
  const product = await prisma.product.findUnique({
    where: { id },
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

  return mapProductToDto(product);
};

export const deleteProduct = async (userId: string, productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { images: true },
  });

  if (!product || product.sellerId !== userId) {
    throw new Error("Product not found or unauthorized");
  }

  try {
    await prisma.$transaction(async (tx) => {
      await Promise.all(product.images.map((img) => deleteFile(img.key)));

      await tx.product.delete({ where: { id: productId } });
    });
  } catch (err) {
    console.error("Failed to delete product:", err);
    throw new Error("Failed to delete product");
  }
};
