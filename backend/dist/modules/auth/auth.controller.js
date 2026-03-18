"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSeller = exports.verifyEmail = exports.sendVerificationCode = exports.logout = exports.refreshToken = exports.login = exports.createUser = void 0;
const authService = __importStar(require("./auth.service"));
const auth_schema_1 = require("./auth.schema");
const zod_1 = require("zod");
const Errors_1 = require("../../utils/Errors");
const createUser = async (req, res, next) => {
    try {
        const createdUser = await authService.createUser(req.body);
        return res.status(201).json({
            success: true,
            message: "Sign up successfully. Please check your email to verify your account.",
            data: createdUser,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const login = async (req, res, next) => {
    try {
        const loginData = await authService.login(req.body);
        res.cookie("refresh_token", loginData.refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 * 7,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            path: "/api/v1/auth",
        });
        const loginResponse = {
            userData: loginData.userData,
            accessToken: loginData.accessToken,
        };
        return res.json({
            success: true,
            message: "User Login",
            data: loginResponse,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const refreshToken = async (req, res, next) => {
    try {
        const { cookies } = auth_schema_1.refreshTokenCookieSchema.parse({
            cookies: req.cookies,
        });
        const { refresh_token } = cookies;
        const refreshResponse = await authService.refreshToken(refresh_token);
        return res.json({
            success: true,
            message: "Access Token Refreshed",
            data: refreshResponse,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return next(new Errors_1.CustomError(401, "Unauthorized"));
        }
        next(error);
    }
};
exports.refreshToken = refreshToken;
const logout = async (req, res, next) => {
    try {
        const parsed = auth_schema_1.refreshTokenCookieSchema.safeParse({
            cookies: req.cookies,
        });
        if (parsed.success) {
            const { refresh_token } = parsed.data.cookies;
            await authService.logout(refresh_token);
        }
        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            path: "/api/v1/auth",
        });
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
// VERIFY USER
const sendVerificationCode = async (req, res, next) => {
    try {
        const { email } = req.body;
        await authService.sendVerificationCode(email);
        return res.status(200).json({
            success: true,
            message: "Verification code sent to email.",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.sendVerificationCode = sendVerificationCode;
const verifyEmail = async (req, res, next) => {
    try {
        const { email, code } = req.body;
        await authService.verifyEmailCode(email, code);
        return res.status(200).json({
            success: true,
            message: "Email verified successfully.",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyEmail = verifyEmail;
const makeSeller = async (req, res, next) => {
    try {
        await authService.makeUserSeller(req.userId);
        return res.status(200).json({
            success: true,
            message: "User is now a seller",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.makeSeller = makeSeller;
