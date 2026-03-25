import z from "zod";
import { updateUserStatusSchema, userDtoSchema } from "./user.schema";
import { ApiResponse } from "../../types/api";

export type UserDto = z.infer<typeof userDtoSchema>;
export type UpdateUserStatusDto = z.infer<typeof updateUserStatusSchema>["body"];
export type UserParams = z.infer<typeof updateUserStatusSchema>["params"];

export type GetAllUsersResponse = ApiResponse<UserDto[]>;
export type UpdateUserStatusResponse = ApiResponse<UserDto>;
