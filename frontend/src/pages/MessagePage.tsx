import React, { useState, useMemo } from "react";
import { ConversationList } from "@/components/chat/ConversationList";
// import { ChatSearch } from '@/components/chat/ChatSearch';
import { MessageSquare, Search } from "lucide-react";
import useAuth from "@/contexts/AuthContext";
import useFetchData from "@/hooks/useFetchData";
import type { ChatConversation } from "@/types/chat";

const MessagesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { authResponse } = useAuth();
  const { data: conversations } =
    useFetchData<ChatConversation[]>("chat/conversations");

  // In a real app, this would come from an auth context
  const currentUserId = authResponse!.userData.id;

  const filteredConversations = useMemo(() => {
    return (conversations || []).filter((conv) => {
      const otherUserName =
        currentUserId === conv.seller.id ? conv.seller.name : conv.buyer.name;
      return (
        otherUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [conversations, searchQuery, currentUserId]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 md:px-8 py-10 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-3 rounded-2xl">
              <MessageSquare className="h-6 w-6 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-neutral-900">
              Messages
            </h1>
          </div>
          <p className="text-neutral-500 font-medium text-lg">
            Chat with buyers and sellers on campus.
          </p>
        </div>

        <div className="mx-auto">
          <div className="bg-white rounded-[40px] shadow-xl shadow-neutral-200/50 border border-neutral-100 overflow-hidden">
            <div className="p-6 border-b border-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-black text-neutral-900 tracking-tight">
                Inbox
              </h2>
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-2xl bg-neutral-50 border-2 border-neutral-100 focus:border-emerald-500 transition-all outline-none font-medium text-sm"
                />
              </div>
            </div>

            <div className="p-2">
              <ConversationList
                conversations={filteredConversations}
                currentUserId={currentUserId}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="h-20" />
    </div>
  );
};

export default MessagesPage;
