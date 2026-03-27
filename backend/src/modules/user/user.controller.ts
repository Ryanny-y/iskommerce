import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import { UpdateUserStatusDto, UserDto, UserParams, SingleUserDto, UpdateUserProfileDto } from "./user.types";
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

export const getSingleUser = async (
  req: Request<UserParams>,
  res: Response<ApiResponse<SingleUserDto>>,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const user = await userService.getSingleUser(userId);

    res.json({
      success: true,
      message: "User retrieved",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (
  req: Request<{}, {}, UpdateUserProfileDto>,
  res: Response<ApiResponse<SingleUserDto>>,
  next: NextFunction,
) => {
  try {
    const file = req.file;
    const user = await userService.updateUserProfile(req.userId!, req.body, file);

    res.json({
      success: true,
      message: "User profile updated",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
