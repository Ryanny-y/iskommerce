import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";
import type { ChatConversation, ChatMessage } from "@/types/chat";
import { toast } from "sonner";
import useAuth from "@/contexts/AuthContext";
import useFetchData from "@/hooks/useFetchData";
import { useSocket } from "@/contexts/SocketContext";

const ChatPage: React.FC = () => {
  const { socket } = useSocket();
  const { conversationId } = useParams<{ conversationId: string }>();
  const { authResponse } = useAuth();

  const navigate = useNavigate();

  const currentUserId = authResponse!.userData.id;
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);

  const {
    data: conversation,
    loading: convoLoading,
    error: convoError,
  } = useFetchData<ChatConversation>(`chat/conversations/${conversationId}`);

  const {
    data: messages,
    loading: messagesLoading,
    error: messageError,
  } = useFetchData<ChatMessage[]>(
    `chat/conversations/${conversationId}/messages`,
  );

  useEffect(() => {
    if (messages) {
      setLocalMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (!socket || !conversationId) return;
    socket.emit("chat:join", conversationId);

    socket.on("chat:new_message", (msg: ChatMessage) => {
      setLocalMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat:new_message");
    };
  }, [socket, conversationId]);

  const handleSendMessage = (text: string) => {
    if (!socket || !conversationId) {
      return;
    }

    if (!text.trim()) return;
    socket.emit("chat:send_message", {
      conversationId,
      message: text,
    });
  };

  if (convoLoading || messagesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-neutral-600">
          Loading conversation...
        </p>
      </div>
    );
  }

  if (convoError || messageError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-black text-red-600 mb-4">
          Something went wrong
        </h2>
        <button
          onClick={() => navigate("/messages")}
          className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold"
        >
          Back to Inbox
        </button>
      </div>
    );
  }

  if (!conversation || !messages) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-black text-neutral-900 mb-4">
          Conversation not found
        </h2>
        <button
          onClick={() => navigate("/messages")}
          className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold"
        >
          Back to Inbox
        </button>
      </div>
    );
  }

  const otherUserName =
    currentUserId === conversation.buyer.id
      ? conversation.seller.name || "Seller"
      : conversation.buyer.name || "Buyer";

  return (
    <div className="min-h-200 bg-background flex flex-col h-40 overflow-hidden">
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full bg-white shadow-2xl shadow-neutral-200/50 sm:my-4 sm:rounded-[40px] overflow-hidden border border-neutral-100">
        <ChatHeader
          otherUserName={otherUserName}
          onViewProfile={() => toast.info("Profile view coming soon!")}
          onViewOrder={() => navigate("/seller/orders")}
        />

        <MessageList messages={localMessages} currentUserId={currentUserId} />

        <MessageInput
          onSend={handleSendMessage}
          onImageUpload={() => toast.info("Image upload coming soon!")}
        />
      </main>
    </div>
  );
};

export default ChatPage;
