import React from "react";
import type { ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
// import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
  isCurrentUser: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col max-w-[80%] space-y-1",
        isCurrentUser ? "ml-auto items-end" : "mr-auto items-start",
      )}
    >
      {message.imageUrl && (
        <div className="rounded-[24px] overflow-hidden border-2 border-white shadow-sm mb-2 group cursor-pointer transition-transform hover:scale-[1.02]">
          <img
            src={message.imageUrl}
            alt="Message attachment"
            className="max-h-60 w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <div
        className={cn(
          "p-4 rounded-[24px] text-sm font-medium shadow-sm leading-relaxed",
          isCurrentUser
            ? "bg-emerald-600 text-white rounded-tr-none"
            : "bg-white text-neutral-900 border border-neutral-100 rounded-tl-none",
        )}
      >
        {message.message}
      </div>

      <div className="flex items-center gap-2 px-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
          {dayjs(message.createdAt).format("MMM YY DD - hh:ss A")}
        </span>
        {/* {isCurrentUser && (
          <div className="text-emerald-500">
            {message.isRead ? (
              <CheckCheck className="h-3 w-3" />
            ) : (
              <Check className="h-3 w-3" />
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};
