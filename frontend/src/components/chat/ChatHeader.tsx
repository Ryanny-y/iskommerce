import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface ChatHeaderProps {
  otherUserName: string;
  onViewProfile?: () => void;
  onViewOrder?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  otherUserName,
  onViewProfile,
  onViewOrder,
}) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-200 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 rounded-xl border-2 border-white shadow-sm">
            <AvatarFallback className="bg-emerald-100 text-emerald-600 font-black">
              {otherUserName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-black text-neutral-900 tracking-tight leading-tight">
              {otherUserName}
            </h3>
            {/* <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Online</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onViewProfile}
          className="rounded-xl text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50"
        >
          <User className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onViewOrder}
          className="rounded-xl text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50"
        >
          <ShoppingBag className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div> */}
    </div>
  );
};
