import { Product, ProductImage } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/client";
import { productDtoSchema, productImageSchema } from "./product.schema";
import { CustomError } from "../../utils/Errors";
import { ProductDto } from "./product.types";

type PrismaProductWithImages = Product & {
  images: ProductImage[];
  seller: {
    id: string;
    fullName: string;
  };
  category: {
    id: string;
    name: string;
  }
};

export const mapProductToDto = (product: PrismaProductWithImages | null): ProductDto => {
  if (!product) throw new CustomError(404, "Product not found");

  return productDtoSchema.parse({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    rating: product.rating instanceof Decimal ? product.rating.toNumber() : product.rating,

    type: product.type,

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

    images: product.images.map((img) =>
      productImageSchema.parse({
        key: img.key,
        fileName: img.fileName,
        bucket: img.bucket,
        url: img.url,
        mimeType: img.mimeType ?? undefined,
        size: img.size ?? undefined,
      })
    ),

    createdAt: product.createdAt.toISOString(),
  });
};