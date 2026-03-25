import React from "react";
import type { ChatConversation } from "@/types/chat";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useChat } from "@/contexts/ChatContext";

interface ConversationItemProps {
  conversation: ChatConversation;
  currentUserId: string;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  currentUserId,
}) => {
  const { unreadMap, resetUnread } = useChat();
  const navigate = useNavigate();

  const otherUserName =
    currentUserId === conversation.seller.id
      ? conversation.buyer.name
      : conversation.seller.name;

  const unreadCount = unreadMap[conversation.id] || 0;
  const hasUnread = unreadCount > 0;

  const handleClick = () => {
    resetUnread(conversation.id);
    navigate(`/messages/${conversation.id}`);
  };

  const formatDate = (date: string) =>
    dayjs(date).format("MMM DD YYYY - hh:mm A");

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-4 p-4 hover:bg-neutral-50 cursor-pointer transition-all border-b border-neutral-50 last:border-none group"
    >
      <div className="relative">
        <Avatar className="h-14 w-14 rounded-2xl border-2 border-white shadow-sm transition-transform group-hover:scale-105">
          <AvatarFallback className="bg-emerald-100 text-emerald-600 font-black text-xl">
            {otherUserName?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
        {hasUnread && (
          <div className="absolute -top-1 -right-1 h-5 w-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-sm">
            {unreadCount}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-black text-neutral-900 truncate tracking-tight">
            {otherUserName}
          </h4>
          <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            {formatDate(conversation.lastMessageAt)}
          </span>
        </div>
        <p
          className={`text-sm truncate ${hasUnread ? "text-neutral-900 font-bold" : "text-neutral-500"}`}
        >
          {conversation.lastMessage || "No new message"}
        </p>
        <span className="block sm:hidden text-[10px] font-bold uppercase tracking-widest text-neutral-400">
          {formatDate(conversation.lastMessageAt)}
        </span>
      </div>
    </div>
  );
};
