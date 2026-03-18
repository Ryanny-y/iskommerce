"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeFromCart = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const client_1 = __importDefault(require("../../config/client"));
const cart_mapper_1 = require("./cart.mapper");
const getCart = async (userId) => {
    let cart = await client_1.default.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            images: true,
                        },
                    },
                },
            },
        },
    });
    if (!cart) {
        cart = await client_1.default.cart.create({
            data: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: true,
                            },
                        },
                    },
                },
            },
        });
    }
    return (0, cart_mapper_1.mapCartToDto)(cart);
};
exports.getCart = getCart;
const addToCart = async (userId, data) => {
    let cart = await client_1.default.cart.findUnique({
        where: { userId },
    });
    if (!cart) {
        cart = await client_1.default.cart.create({
            data: { userId },
        });
    }
    const existingItem = await client_1.default.cartItem.findFirst({
        where: {
            cartId: cart.id,
            productId: data.productId,
        },
    });
    if (existingItem) {
        await client_1.default.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + data.quantity },
        });
    }
    else {
        await client_1.default.cartItem.create({
            data: {
                cartId: cart.id,
                productId: data.productId,
                quantity: data.quantity,
            },
        });
    }
    const updatedCart = await client_1.default.cart.findUnique({
        where: { id: cart.id },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            images: true,
                        },
                    },
                },
            },
        },
    });
    return (0, cart_mapper_1.mapCartToDto)(updatedCart);
};
exports.addToCart = addToCart;
const updateCartItem = async (userId, cartItemId, data) => {
    const cart = await client_1.default.cart.findUnique({
        where: { userId },
    });
    if (!cart)
        throw new Error("Cart not found");
    await client_1.default.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: data.quantity },
    });
    const updatedCart = await client_1.default.cart.findUnique({
        where: { id: cart.id },
        include: {
            items: {
                include: {
                    product: { include: { images: true } },
                },
            },
        },
    });
    return (0, cart_mapper_1.mapCartToDto)(updatedCart);
};
exports.updateCartItem = updateCartItem;
const removeFromCart = async (userId, cartItemId) => {
    const cart = await client_1.default.cart.findUnique({
        where: { userId },
    });
    if (!cart) {
        throw new Error("Cart not found");
    }
    await client_1.default.cartItem.deleteMany({
        where: { id: cartItemId },
    });
};
exports.removeFromCart = removeFromCart;
const clearCart = async (userId) => {
    const cart = await client_1.default.cart.findUnique({
        where: { userId },
    });
    if (!cart) {
        throw new Error("Cart not found");
    }
    await client_1.default.cartItem.deleteMany({
        where: { cartId: cart.id },
    });
};
exports.clearCart = clearCart;
