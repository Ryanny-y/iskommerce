import React from "react";
import type { ChatConversation } from "@/types/chat";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ConversationItemProps {
  conversation: ChatConversation;
  currentUserId: string;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  currentUserId,
}) => {
  const navigate = useNavigate();

  // Determine other user info
  const otherUserName =
    currentUserId === conversation.seller.id
      ? conversation.buyer.name
      : conversation.seller.name;

  const handleClick = () => {
    navigate(`/messages/${conversation.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-4 p-4 hover:bg-neutral-50 cursor-pointer transition-all border-b border-neutral-50 last:border-none group"
    >
      <div className="relative">
        <Avatar className="h-14 w-14 rounded-2xl border-2 border-white shadow-sm transition-transform group-hover:scale-105">
          <AvatarFallback className="bg-emerald-100 text-emerald-600 font-black text-xl">
            {otherUserName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {/* {conversation.unreadCount && conversation.unreadCount > 0 ? (
          <div className="absolute -top-1 -right-1 h-5 w-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-sm">
            {conversation.unreadCount}
          </div>
        ) : null} */}
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-black text-neutral-900 truncate tracking-tight">
            {otherUserName}
          </h4>
          <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            {dayjs(conversation.lastMessageAt).format("MMM DD YYYY - hh:ss A")}
          </span>
        </div>
        <p className={"text-sm truncate font-medium text-neutral-700"}>
          {conversation.lastMessage
            ? conversation.lastMessage
            : "No new message"}
        </p>
        <span className="block sm:hidden text-[10px] font-bold uppercase tracking-widest text-neutral-400">
          {dayjs(conversation.lastMessageAt).format("MMM DD YYYY - hh:ss A")}
        </span>
      </div>
    </div>
  );
};
