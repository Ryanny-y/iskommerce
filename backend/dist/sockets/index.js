"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerSocketHandlers;
const chat_socket_1 = __importDefault(require("./chat.socket"));
const notification_socket_1 = __importDefault(require("./notification.socket"));
function registerSocketHandlers(io) {
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);
        (0, chat_socket_1.default)(io, socket);
        (0, notification_socket_1.default)(io, socket);
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}
