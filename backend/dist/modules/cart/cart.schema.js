"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartDtoSchema = exports.cartItemDtoSchema = exports.cartItemParamsSchema = exports.updateCartItemSchema = exports.addToCartSchema = void 0;
const zod_1 = require("zod");
exports.addToCartSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.uuid(),
        quantity: zod_1.z.number().int().min(1),
    }),
});
exports.updateCartItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        quantity: zod_1.z.number().int().min(1),
    }),
    params: zod_1.z.object({
        cartItemId: zod_1.z.uuid(),
    }),
});
exports.cartItemParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        cartItemId: zod_1.z.uuid(),
    }),
});
exports.cartItemDtoSchema = zod_1.z.object({
    id: zod_1.z.string(),
    quantity: zod_1.z.number(),
    product: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        price: zod_1.z.number(),
        stock: zod_1.z.number(),
        images: zod_1.z.array(zod_1.z.object({
            url: zod_1.z.string(),
        })),
    }),
});
exports.cartDtoSchema = zod_1.z.object({
    id: zod_1.z.string(),
    items: zod_1.z.array(exports.cartItemDtoSchema),
});
