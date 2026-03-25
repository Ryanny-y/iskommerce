import prisma from "../../config/client";
import { mapCartToDto } from "./cart.mapper";
import {
  AddToCartDto,
  CartDto,
  CheckoutDto,
  CheckoutResultDto,
  UpdateCartItemDto,
} from "./cart.types";
import { sendNotification } from "../notification/notification.service";

export const getCart = async (userId: string): Promise<CartDto> => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
              seller: {
                select: {
                  id: true,
                  fullName: true,
                },
              },
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
                seller: {
                  select: {
                    id: true,
                    fullName: true,
                  },
                },
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
              seller: { select: { id: true, fullName: true } },
            },
          },
        },
      },
    },
  });

  if (!updatedCart) {
    throw new Error("Cart not found after update");
  }

  return mapCartToDto(updatedCart);
};

export const updateCartItem = async (
  userId: string,
  cartItemId: string,
  data: UpdateCartItemDto,
): Promise<CartDto> => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) throw new Error("Cart not found");

  await prisma.cartItem.update({
    where: { id: cartItemId },
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
              seller: { select: { id: true, fullName: true } },
            },
          },
        },
      },
    },
  });

  if (!updatedCart) {
    throw new Error("Cart not found after update");
  }

  return mapCartToDto(updatedCart);
};

export const removeFromCart = async (
  userId: string,
  cartItemId: string,
): Promise<void> => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  await prisma.cartItem.deleteMany({
    where: { id: cartItemId },
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

export const checkout = async (
  userId: string,
  data: CheckoutDto,
): Promise<CheckoutResultDto> => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: true,
    },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const orders = await prisma.$transaction(async (tx) => {
    const createdOrders = [];

    for (const sellerOrder of data.sellerOrders) {
      const seller = await tx.user.findUnique({
        where: { id: sellerOrder.sellerId },
      });

      const newOrder = await tx.order.create({
        data: {
          buyerId: userId,
          sellerId: sellerOrder.sellerId,
          total: sellerOrder.total,
          paymentMethod: data.paymentMethod,
          fulfillmentType: sellerOrder.fulfillmentType,
          meetupTime: sellerOrder.meetupTime
            ? new Date(sellerOrder.meetupTime)
            : null,
          meetupLocation: sellerOrder.meetupLocation ?? null,
          meetupNotes: sellerOrder.meetupNotes ?? null,
        },
        include: {
          items: true,
        },
      });

      for (const item of sellerOrder.items) {
        const product = await tx.product.findUnique({
          where: { id: item.product.id },
        });

        if (!product) throw new Error(`Product ${item.product.id} not found`);

        if (item.quantity > product.stock) {
          throw new Error(
            `Not enough stock for product "${product.name}". Available: ${product.stock}, requested: ${item.quantity}`,
          );
        }

        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.product.id,
            productName: item.product.name,
            productImageUrl: item.product.images[0]?.url || null,
            quantity: item.quantity,
            price: item.product.price,
          },
        });

        await tx.product.update({
          where: { id: item.product.id },
          data: { stock: { decrement: item.quantity } },
        });
      }

      await tx.cartItem.deleteMany({
        where: {
          id: { in: sellerOrder.items.map((item) => item.id) },
        },
      });

      const orderWithItems = await tx.order.findUnique({
        where: { id: newOrder.id },
        include: {
          items: true,
        },
      });

      createdOrders.push(orderWithItems);
    }

    return createdOrders;
  });

  for (const order of orders) {
    if (!order) throw new Error("Order not found.");
    await sendNotification({
      userId: order.sellerId,
      type: "NEW_ORDER",
      message: "You have a new order",
    });

    await sendNotification({
      userId: order.buyerId,
      type: "ORDER_UPDATE",
      message: `Your order has been placed successfully`,
    });
  }

  return {
    orders: orders.map((order) => {
      if (!order) throw new Error("Order not found");

      return {
        id: order.id,
        status: order.status,
        buyerId: order.buyerId,
        sellerId: order.sellerId,
        fulfillmentType: order.fulfillmentType,
        pickupLocation: order.pickupLocation,
        pickupTime: order.pickupTime?.toISOString() || null,
        meetupTime: order.meetupTime?.toISOString() || null,
        meetupLocation: order.meetupLocation,
        meetupNotes: order.meetupNotes,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        total: order.total,
        createdAt: order.createdAt.toISOString(),
        items: order.items.map((item) => ({
          id: item.id,
          productName: item.productName,
          productImageUrl: item.productImageUrl,
          quantity: item.quantity,
          price: item.price,
        })),
      };
    }),
    totalAmount: data.totalAmount,
  };
};
