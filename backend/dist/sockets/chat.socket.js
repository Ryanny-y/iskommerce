"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerChatSocket;
function registerChatSocket(io, socket) {
    socket.on("chat:join", (conversationId) => {
        socket.join(`conversation:${conversationId}`);
    });
    socket.on("chat:send_message", (data) => {
        const { conversationId, message } = data;
        io.to(`conversation:${conversationId}`).emit("chat:new_message", {
            message,
            conversationId
        });
    });
}
