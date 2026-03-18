"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserSeller = exports.verifyEmailCode = exports.sendVerificationCode = exports.logout = exports.refreshToken = exports.login = exports.createUser = void 0;
const client_1 = __importDefault(require("../../config/client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Errors_1 = require("../../utils/Errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const date_fns_1 = require("date-fns");
const client_2 = require("@prisma/client");
const generateVerificationCode_1 = require("../../utils/generateVerificationCode");
const email_service_1 = require("../../services/email.service");
const createUser = async (data) => {
    const { fullName, email, password, confirmPassword, roles } = data;
    const normalizedEmail = email.toLowerCase();
    // Check if user exists
    const existingUser = await client_1.default.user.findUnique({
        where: { email: normalizedEmail },
    });
    if (existingUser) {
        throw new Errors_1.CustomError(409, "User already exists");
    }
    if (password !== confirmPassword) {
        throw new Errors_1.CustomError(400, "Passwords do not match.");
    }
    // Hash password
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const code = (0, generateVerificationCode_1.generateVerificationCode)();
    const hashedCode = await bcrypt_1.default.hash(code, 10);
    // Create user
    const createdUser = await client_1.default.user.create({
        data: {
            fullName,
            email: normalizedEmail,
            password: hashedPassword,
            verificationCodeHash: hashedCode,
            verificationCodeExpires: (0, date_fns_1.addMinutes)(new Date(), 5),
            roles: {
                create: roles.map((role) => ({
                    role,
                })),
            },
        },
        include: {
            roles: true,
        },
    });
    await (0, email_service_1.sendVerificationEmail)(createdUser.email, code);
    return {
        id: createdUser.id,
        fullName: createdUser.fullName,
        email: createdUser.email,
        roles: convertUserRoleToRoleEnum(createdUser.roles),
    };
};
exports.createUser = createUser;
const login = async (data) => {
    const { email, password } = data;
    const foundUser = await client_1.default.user.findUnique({
        where: { email: email.toLowerCase() },
        include: {
            roles: true,
        },
    });
    if (!foundUser)
        throw new Errors_1.CustomError(401, "Email or password is incorrect.");
    const match = await bcrypt_1.default.compare(password, foundUser.password);
    if (!match)
        throw new Errors_1.CustomError(401, "Email or password is incorrect.");
    if (!foundUser?.isVerified)
        throw new Errors_1.CustomError(403, "User is not yet verified. Please verify your account first.");
    const userRoles = convertUserRoleToRoleEnum(foundUser.roles);
    // CREATE JWTS
    const accessToken = jsonwebtoken_1.default.sign({
        sub: foundUser.id,
        role: userRoles,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jsonwebtoken_1.default.sign({
        sub: foundUser.id,
        role: userRoles,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    // HASH PASSWORD BEFORE STORING IN THE DATABASE
    const hashedRefreshToken = await bcrypt_1.default.hash(refreshToken, 10);
    await client_1.default.user.update({
        where: {
            id: foundUser.id,
        },
        data: {
            refreshTokenHash: hashedRefreshToken,
            refreshTokenExpiresAt: (0, date_fns_1.addDays)(new Date(), 7),
        },
    });
    return {
        userData: {
            id: foundUser.id,
            fullName: foundUser.fullName,
            email: foundUser.email,
            roles: userRoles,
        },
        accessToken,
        refreshToken
    };
};
exports.login = login;
const refreshToken = async (refreshToken) => {
    let payload;
    console.log(refreshToken);
    try {
        payload = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    }
    catch {
        throw new Errors_1.CustomError(401, "Unauthorized");
    }
    const foundUser = await client_1.default.user.findUnique({
        where: {
            id: payload.sub,
        },
        include: {
            roles: true,
        },
    });
    if (!foundUser || !foundUser?.refreshTokenHash)
        throw new Errors_1.CustomError(401, "Unauthorized");
    const isSameToken = await bcrypt_1.default.compare(refreshToken, foundUser.refreshTokenHash);
    if (!foundUser.refreshTokenExpiresAt ||
        !isSameToken ||
        foundUser.refreshTokenExpiresAt.getTime() < Date.now()) {
        throw new Errors_1.CustomError(401, "Unauthorized");
    }
    const userRoles = convertUserRoleToRoleEnum(foundUser.roles);
    const newAccessToken = jsonwebtoken_1.default.sign({
        sub: foundUser.id,
        role: userRoles,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    return {
        userData: {
            id: foundUser.id,
            fullName: foundUser.fullName,
            email: foundUser.email,
            roles: userRoles,
        },
        accessToken: newAccessToken,
    };
};
exports.refreshToken = refreshToken;
const logout = async (refreshToken) => {
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    }
    catch {
        return;
    }
    const user = await client_1.default.user.findUnique({
        where: {
            id: payload.sub,
        },
        select: {
            refreshTokenHash: true,
        },
    });
    if (!user || !user.refreshTokenHash) {
        return;
    }
    const isValid = await bcrypt_1.default.compare(refreshToken, user.refreshTokenHash);
    if (!isValid) {
        return;
    }
    await client_1.default.user.update({
        where: {
            id: payload.sub,
        },
        data: {
            refreshTokenHash: null,
            refreshTokenExpiresAt: null,
        },
    });
};
exports.logout = logout;
const convertUserRoleToRoleEnum = (roles) => {
    return roles.map((r) => r.role);
};
// VERIFICATION CODE
const sendVerificationCode = async (email) => {
    const normalizedEmail = email.toLowerCase();
    const user = await client_1.default.user.findUnique({
        where: { email: normalizedEmail },
    });
    if (!user) {
        throw new Errors_1.CustomError(404, "User not found");
    }
    const code = (0, generateVerificationCode_1.generateVerificationCode)();
    const hashedCode = await bcrypt_1.default.hash(code, 10);
    await client_1.default.user.update({
        where: { id: user.id },
        data: {
            verificationCodeHash: hashedCode,
            verificationCodeExpires: (0, date_fns_1.addMinutes)(new Date(), 5),
        },
    });
    await (0, email_service_1.sendVerificationEmail)(user.email, code);
    return {
        message: "Verification code sent to email",
    };
};
exports.sendVerificationCode = sendVerificationCode;
const verifyEmailCode = async (email, code) => {
    const user = await client_1.default.user.findUnique({
        where: { email: email.toLowerCase() },
    });
    if (user?.isVerified) {
        throw new Errors_1.CustomError(409, "User is already verified.");
    }
    if (!user || !user.verificationCodeHash) {
        throw new Errors_1.CustomError(400, "Invalid code");
    }
    const isValid = await bcrypt_1.default.compare(code, user.verificationCodeHash);
    if (!isValid ||
        !user.verificationCodeExpires ||
        user.verificationCodeExpires.getTime() < Date.now()) {
        throw new Errors_1.CustomError(400, "Code expired or invalid");
    }
    await client_1.default.user.update({
        where: { id: user.id },
        data: {
            isVerified: true,
            verificationCodeHash: null,
            verificationCodeExpires: null,
        },
    });
    return {
        message: "Email verified successfully",
    };
};
exports.verifyEmailCode = verifyEmailCode;
const makeUserSeller = async (userId) => {
    const user = await client_1.default.user.findUnique({
        where: { id: userId },
        include: { roles: true },
    });
    if (!user) {
        throw new Errors_1.CustomError(404, "User not found");
    }
    const alreadySeller = user.roles.some((r) => r.role === client_2.Role.SELLER);
    if (alreadySeller) {
        throw new Errors_1.CustomError(409, "User is already a seller");
    }
    await client_1.default.user.update({
        where: { id: userId },
        data: {
            roles: {
                create: {
                    role: client_2.Role.SELLER,
                },
            },
        },
    });
    return {
        message: "User updated to seller successfully",
    };
};
exports.makeUserSeller = makeUserSeller;
