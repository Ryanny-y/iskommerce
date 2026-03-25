import z from "zod";
import { notificationDtoSchema } from "./notification.schema";
import { ApiResponse } from "../../types/api";

export type NotificationDto = z.infer<typeof notificationDtoSchema>;

export type GetNotificationsResponse = ApiResponse<NotificationDto[]>;
