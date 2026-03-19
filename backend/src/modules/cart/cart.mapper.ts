import { Prisma } from "@prisma/client";
import { CartDto } from "./cart.types";

type CartWithRelations = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            images: true;
            seller: {
              select: {
                id: true;
                fullName: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export const mapCartToDto = (cart: CartWithRelations): CartDto => {
  return {
    id: cart.id,
    items: cart.items.map((item: any) => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        stock: item.product.stock,

        sellerId: item.product.seller.id,
        seller: item.product.seller.fullName,

        images: item.product.images.map((img: any) => ({
          url: img.url,
        })),
      },
    })),
  };
};
