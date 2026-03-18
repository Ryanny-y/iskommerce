"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerNotificationSocket;
function registerNotificationSocket(io, socket) {
    socket.on("notification:join", (userId) => {
        socket.join(`user:${userId}`);
    });
}
