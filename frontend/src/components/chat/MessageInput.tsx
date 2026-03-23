import React, { useState, useRef } from 'react';
import { Send, Plus, Image as ImageIcon, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSend: (message: string, imageUrl?: string) => void;
  onImageUpload?: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend, onImageUpload }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6 border-t border-neutral-50 bg-white/80 backdrop-blur-md sticky bottom-0 z-20">
      <div className="flex items-center gap-3 max-w-4xl mx-auto">
        {/* <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onImageUpload}
            className="rounded-xl text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-xl text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 hidden sm:flex"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
        </div> */}

        <div className="relative flex-1 group">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-14 pl-6 pr-14 rounded-[28px] bg-neutral-100 border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all outline-none font-medium text-sm shadow-inner"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-xl text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50"
          >
            <Smile className="h-5 w-5" />
          </Button>
        </div>

        <Button 
          onClick={handleSend}
          disabled={!message.trim()}
          className={cn(
            "h-14 w-14 rounded-[28px] p-0 shadow-lg transition-all transform active:scale-95",
            message.trim() 
              ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200" 
              : "bg-neutral-200 text-neutral-400 shadow-none cursor-not-allowed"
          )}
        >
          <Send className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};
