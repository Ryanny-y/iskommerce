"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_schema_1 = require("./auth.schema");
const validate_1 = require("../../middlewares/validate");
const verifyJwt_1 = __importDefault(require("../../middlewares/verifyJwt"));
const router = (0, express_1.Router)();
router.post("/signup", (0, validate_1.validate)(auth_schema_1.createUserBodySchema), auth_controller_1.createUser);
router.post("/login", (0, validate_1.validate)(auth_schema_1.loginUserBodySchema), auth_controller_1.login);
router.post("/refresh-token", (0, validate_1.validate)(auth_schema_1.refreshTokenCookieSchema), auth_controller_1.refreshToken);
router.post("/logout", auth_controller_1.logout);
router.post("/send-verification", (0, validate_1.validate)(auth_schema_1.sendVerificationCodeSchema), auth_controller_1.sendVerificationCode);
router.post("/verify-email", (0, validate_1.validate)(auth_schema_1.verifyEmailSchema), auth_controller_1.verifyEmail);
router.post("/make-seller", verifyJwt_1.default, auth_controller_1.makeSeller);
exports.default = router;
