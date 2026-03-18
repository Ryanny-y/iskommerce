import { CartDto } from "./cart.types";

export const mapCartToDto = (cart: any): CartDto => {
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
        images: item.product.images.map((img: any) => ({
          url: img.url,
        })),
      },
    })),
  };
};
