import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import { UpdateUserStatusDto, UserDto, UserParams } from "./user.types";
import { ApiResponse } from "../../types/api";

export const getAllUsers = async (
  req: Request,
  res: Response<ApiResponse<UserDto[]>>,
  next: NextFunction,
) => {
  try {
    const users = await userService.getAllUsers();

    res.json({
      success: true,
      message: "Users retrieved",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (
  req: Request<UserParams, {}, UpdateUserStatusDto>,
  res: Response<ApiResponse<UserDto>>,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const user = await userService.updateUserStatus(userId, req.body);

    res.json({
      success: true,
      message: "User status updated",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
