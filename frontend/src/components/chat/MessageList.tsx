import React, { useEffect, useRef } from 'react';
import type { ChatMessage } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessageListProps {
  messages: ChatMessage[];
  currentUserId: string;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <ScrollArea ref={scrollRef} className="flex-1 p-6 bg-neutral-50/30">
      <div className="space-y-8 pb-4">
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            isCurrentUser={msg.senderId === currentUserId} 
          />
        ))}
      </div>
    </ScrollArea>
  );
};
