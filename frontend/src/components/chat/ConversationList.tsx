import React from "react";
import type { ChatConversation } from "@/types/chat";
import { ConversationItem } from "./ConversationItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";

interface ConversationListProps {
  conversations: ChatConversation[];
  currentUserId: string;
  loadingConvo: boolean;
  errorConvo: string | null;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  currentUserId,
  loadingConvo,
  errorConvo,
}) => {
  if (loadingConvo) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-neutral-500 font-semibold">
          Loading conversations...
        </p>
      </div>
    );
  }

  if (errorConvo) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <h3 className="text-xl font-black text-red-600">
          Failed to load conversations
        </h3>
        <p className="text-neutral-500">{errorConvo}</p>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-neutral-50/50 rounded-[40px] border-2 border-dashed border-neutral-200">
        <div className="bg-white p-8 rounded-full shadow-xl shadow-neutral-200/50">
          <MessageSquare className="h-16 w-16 text-neutral-200" />
        </div>
        <div className="space-y-2 max-w-xs">
          <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
            No conversations yet
          </h3>
          <p className="text-neutral-500 font-medium leading-relaxed">
            Start chatting with sellers or buyers to see your messages here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-280px)]">
      <div className="space-y-1">
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            conversation={conv}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
