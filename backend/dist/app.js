"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const modules_1 = __importDefault(require("./modules"));
const corsConfig_1 = __importDefault(require("./config/corsConfig"));
const Errors_1 = require("./utils/Errors");
const app = (0, express_1.default)();
app.use(corsConfig_1.default);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// ROUTES
app.use("/api/v1", modules_1.default);
app.use(Errors_1.errorHandler);
exports.default = app;
