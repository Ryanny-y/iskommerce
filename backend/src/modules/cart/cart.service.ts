import prisma from "../../config/client";
import { mapCartToDto } from "./cart.mapper";
import { AddToCartDto, CartDto, UpdateCartItemDto } from "./cart.types";

export const getCart = async (userId: string): Promise<CartDto> => {
  let cart = await prisma.cart.findUnique({
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
    cart = await prisma.cart.create({
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

  return mapCartToDto(cart);
};

export const addToCart = async (
  userId: string,
  data: AddToCartDto,
): Promise<CartDto> => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: data.productId,
    },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + data.quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: data.productId,
        quantity: data.quantity,
      },
    });
  }

  const updatedCart = await prisma.cart.findUnique({
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

  return mapCartToDto(updatedCart);
};

export const updateCartItem = async (
  userId: string,
  productId: string,
  data: UpdateCartItemDto,
): Promise<CartDto> => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  await prisma.cartItem.updateMany({
    where: {
      cartId: cart.id,
      productId,
    },
    data: { quantity: data.quantity },
  });

  const updatedCart = await prisma.cart.findUnique({
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

  return mapCartToDto(updatedCart);
};

export const removeFromCart = async (
  userId: string,
  productId: string,
): Promise<void> => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
      productId,
    },
  });
};

export const clearCart = async (userId: string): Promise<void> => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });
};
