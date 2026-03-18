import { Request, Response, NextFunction } from "express";
import * as cartService from "./cart.service";
import {
  AddToCartDto,
  CartDto,
  CartItemParams,
  UpdateCartItemDto,
} from "./cart.types";
import { ApiResponse } from "../../types/api";

export const getCart = async (
  req: Request,
  res: Response<ApiResponse<CartDto>>,
  next: NextFunction,
) => {
  try {
    const cart = await cartService.getCart(req.userId!);

    res.json({
      success: true,
      message: "Cart retrieved",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (
  req: Request<{}, {}, AddToCartDto>,
  res: Response<ApiResponse<CartDto>>,
  next: NextFunction,
) => {
  try {
    const cart = await cartService.addToCart(req.userId!, req.body);

    res.json({
      success: true,
      message: "Item added to cart",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (
  req: Request<CartItemParams, {}, UpdateCartItemDto>,
  res: Response<ApiResponse<CartDto>>,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const cart = await cartService.updateCartItem(
      req.userId!,
      productId,
      req.body,
    );

    res.json({
      success: true,
      message: "Cart item updated",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (
  req: Request<CartItemParams>,
  res: Response<ApiResponse<void>>,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    await cartService.removeFromCart(req.userId!, productId);

    res.json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (
  req: Request,
  res: Response<ApiResponse<void>>,
  next: NextFunction,
) => {
  try {
    await cartService.clearCart(req.userId!);

    res.json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    next(error);
  }
};
