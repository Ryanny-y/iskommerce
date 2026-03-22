import { Request, Response, NextFunction } from "express";
import * as orderService from "./order.service";
import { AcceptOrderDto, CancelOrderDto, OrderDto, OrderParams, OrderStats, UpdateOrderStatusDto } from "./order.types";
import { ApiResponse } from "../../types/api";

export const getBuyerOrders = async (
  req: Request,
  res: Response<ApiResponse<OrderDto[]>>,
  next: NextFunction,
) => {
  try {
    const orders = await orderService.getBuyerOrders(req.userId!);

    res.json({
      success: true,
      message: "Buyer orders retrieved",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getSellerOrders = async (
  req: Request,
  res: Response<ApiResponse<OrderDto[]>>,
  next: NextFunction,
) => {
  try {
    const orders = await orderService.getSellerOrders(req.userId!);

    res.json({
      success: true,
      message: "Seller orders retrieved",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (
  req: Request<OrderParams, {}, UpdateOrderStatusDto>,
  res: Response<ApiResponse<OrderDto>>,
  next: NextFunction,
) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.updateOrderStatus(
      req.userId!,
      orderId,
      req.body,
    );

    res.json({
      success: true,
      message: "Order status updated",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const acceptOrder = async (
  req: Request<OrderParams, {}, AcceptOrderDto>,
  res: Response<ApiResponse<OrderDto>>,
  next: NextFunction,
) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.acceptOrder(
      req.userId!,
      orderId,
      req.body,
    );

    res.json({
      success: true,
      message: "Order accepted",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const completeOrder = async (
  req: Request<OrderParams>,
  res: Response<ApiResponse<OrderDto>>,
  next: NextFunction,
) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.completeOrder(req.userId!, orderId);

    res.json({
      success: true,
      message: "Order completed",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (
  req: Request<OrderParams, {}, CancelOrderDto>,
  res: Response<ApiResponse<OrderDto>>,
  next: NextFunction,
) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.cancelOrder(
      req.userId!,
      orderId,
      req.body,
    );

    res.json({
      success: true,
      message: "Order cancelled",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getBuyerOrderStats = async (
  req: Request,
  res: Response<ApiResponse<OrderStats>>,
  next: NextFunction,
) => {
  try {
    const stats = await orderService.getBuyerOrderStats(req.userId!);

    res.json({
      success: true,
      message: "Buyer order stats retrieved",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const getSellerOrderStats = async (
  req: Request,
  res: Response<ApiResponse<OrderStats>>,
  next: NextFunction,
) => {
  try {
    const stats = await orderService.getSellerOrderStats(req.userId!);

    res.json({
      success: true,
      message: "Seller order stats retrieved",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
