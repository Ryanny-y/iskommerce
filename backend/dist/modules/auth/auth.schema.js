"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResponseSchema = exports.userDtoSchema = exports.refreshTokenCookieSchema = exports.verifyEmailSchema = exports.sendVerificationCodeSchema = exports.loginUserBodySchema = exports.createUserBodySchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.createUserBodySchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().min(1, "Full name is required"),
        email: zod_1.z.email("Invalid email address").min(1, "Email is required"),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .regex(/[A-Z]/, "Must contain an uppercase letter")
            .regex(/[0-9]/, "Must contain a number"),
        confirmPassword: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .regex(/[A-Z]/, "Must contain an uppercase letter")
            .regex(/[0-9]/, "Must contain a number"),
        roles: zod_1.z.array(zod_1.z.enum(client_1.Role)).min(1, "At least one role is required"),
    })
});
exports.loginUserBodySchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email().min(1, "Email is required."),
        password: zod_1.z.string().min(1, "Password is required."),
    })
});
exports.sendVerificationCodeSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email().min(1, "Email is required."),
    })
});
exports.verifyEmailSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email().min(1, "Email is required."),
        code: zod_1.z.string().length(6),
    })
});
exports.refreshTokenCookieSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refresh_token: zod_1.z.string(),
    }),
});
exports.userDtoSchema = zod_1.z.object({
    id: zod_1.z.string(),
    fullName: zod_1.z.string().optional(),
    email: zod_1.z.email(),
    roles: zod_1.z.array(zod_1.z.enum(client_1.Role)),
});
exports.authResponseSchema = zod_1.z.object({
    userData: exports.userDtoSchema,
    accessToken: zod_1.z.string(),
});
