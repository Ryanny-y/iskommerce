import z from "zod";
import { updateUserStatusSchema, userDtoSchema, singleUserDtoSchema, updateUserProfileSchema } from "./user.schema";
import { ApiResponse } from "../../types/api";

export type UserDto = z.infer<typeof userDtoSchema>;
export type UpdateUserStatusDto = z.infer<typeof updateUserStatusSchema>["body"];
export type UserParams = z.infer<typeof updateUserStatusSchema>["params"];
export type SingleUserDto = z.infer<typeof singleUserDtoSchema>;
export type UpdateUserProfileDto = z.infer<typeof updateUserProfileSchema>["body"];

export type GetAllUsersResponse = ApiResponse<UserDto[]>;
export type UpdateUserStatusResponse = ApiResponse<UserDto>;
export type GetSingleUserResponse = ApiResponse<SingleUserDto>;
export type UpdateUserProfileResponse = ApiResponse<SingleUserDto>;
