"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCartToDto = void 0;
const mapCartToDto = (cart) => {
    return {
        id: cart.id,
        items: cart.items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            product: {
                id: item.product.id,
                name: item.product.name,
                price: item.product.price,
                stock: item.product.stock,
                images: item.product.images.map((img) => ({
                    url: img.url,
                })),
            },
        })),
    };
};
exports.mapCartToDto = mapCartToDto;
