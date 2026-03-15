import { Product, ProductImage } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/client";
import { productDtoSchema, productImageSchema } from "./product.schema";
import { CustomError } from "../../utils/Errors";

type PrismaProductWithImages = Product & {
  images: ProductImage[];
};

export const mapProductToDto = (product: PrismaProductWithImages | null) => {
  if (!product) throw new CustomError(404, "Product not found");

  return productDtoSchema.parse({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    rating: product.rating instanceof Decimal ? product.rating.toNumber() : product.rating,

    // FOOD fields
    food_notes: product.food_notes ?? undefined,
    allergen_info: product.allergen_info ?? undefined,
    spicy_level: product.spicy_level ?? undefined,

    // NON-FOOD field
    condition: product.condition ?? "",

    sellerId: product.sellerId,
    categoryId: product.categoryId,

    images: product.images.map((img) =>
      productImageSchema.parse({
        url: img.url,
        key: img.key,
        fileName: img.fileName,
        mimeType: img.mimeType ?? undefined,
        size: img.size ?? undefined,
      })
    ),

    createdAt: product.createdAt.toISOString(),
  });
};