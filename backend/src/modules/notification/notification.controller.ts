import { Request, Response, NextFunction } from "express";
import * as notificationService from "./notification.service";
import { NotificationDto } from "./notification.types";
import { ApiResponse } from "../../types/api";

export const getUserNotifications = async (
  req: Request,
  res: Response<ApiResponse<NotificationDto[]>>,
  next: NextFunction,
) => {
  try {
    const notifications = await notificationService.getUserNotifications(
      req.userId!,
    );

    res.json({
      success: true,
      message: "Notifications retrieved",
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};
