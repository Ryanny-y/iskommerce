import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, Calendar } from "lucide-react";
import type { Seller } from "@/types/seller";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import useAuth from "@/contexts/AuthContext";
import type { ChatConversation } from "@/types/chat";
import useMutation from "@/hooks/useMutation";
import { useRef, useState } from "react";

interface SellerProfileHeaderProps {
  seller: Seller;
  averageRating: number;
  totalReviews: number;
  refetchSeller: () => void
}

export function SellerProfileHeader({
  seller,
  averageRating,
  totalReviews,
  refetchSeller
}: SellerProfileHeaderProps) {
  const isSeller = seller.roles.includes("SELLER");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    fullName: seller.fullName,
    bio: seller.bio || "",
    avatar: seller.avatar || "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const { execute } = useMutation();
  const { authResponse } = useAuth();

  const isCurrentUser = authResponse?.userData.id === seller.id;

  const initials = seller.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // ================= CHAT =================
  const handleChatSeller = async () => {
    if (isCurrentUser) return;

    try {
      const response: ChatConversation = await execute("chat/conversations", {
        method: "POST",
        body: JSON.stringify({
          buyerId: authResponse!.userData.id,
          sellerId: seller.id,
        }),
      });

      navigate(`/messages/${response.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= AVATAR CHANGE =================
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const previewUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setForm((prev) => ({
      ...prev,
      avatar: previewUrl,
    }));
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("fullName", form.fullName);
      formData.append("bio", form.bio);

      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      await execute(`users`, {
        method: "PATCH",
        body: formData,
      });

      setIsEditing(false);
      refetchSeller();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= CANCEL =================
  const handleCancel = () => {
    setForm({
      fullName: seller.fullName,
      bio: seller.bio || "",
      avatar: seller.avatar || "",
    });
    setSelectedFile(null);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* ================= AVATAR ================= */}
          <div
            className="relative group cursor-pointer"
            onClick={() => isEditing && fileInputRef.current?.click()}
          >
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-emerald-50 shadow-sm">
              <AvatarImage
                src={isEditing ? form.avatar : seller.avatar}
                alt={seller.fullName}
              />
              <AvatarFallback className="text-2xl font-bold bg-emerald-100 text-emerald-700">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Hover Overlay */}
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-full">
                <span className="text-white text-xs font-semibold">
                  Change Photo
                </span>
              </div>
            )}

            <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-600 border-white shadow-sm">
              {isSeller ? "Verified Seller" : "Verified User"}
            </Badge>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          {/* ================= INFO ================= */}
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              {isEditing ? (
                <input
                  value={form.fullName}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className="text-3xl font-black border rounded-lg px-3 py-2 w-full"
                />
              ) : (
                <h1 className="text-3xl font-black">{seller.fullName}</h1>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                {isSeller && (
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-neutral-900">
                      {averageRating.toFixed(1)}
                    </span>
                    <span>({totalReviews} reviews)</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Member since {dayjs(seller.createdAt).format("MMM YYYY")}
                  </span>
                </div>
              </div>
            </div>

            {isEditing ? (
              <textarea
                value={form.bio}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }))
                }
                className="w-full border rounded-lg px-3 py-2 min-h-25"
              />
            ) : (
              <p className="text-neutral-600">
                {seller.bio || "No Bio Provided"}
              </p>
            )}
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="w-full md:w-auto flex flex-col gap-3">
            {isCurrentUser && !isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="rounded-2xl font-bold h-12 px-8"
              >
                Edit Profile
              </Button>
            )}

            {isCurrentUser && isEditing && (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-emerald-600 text-white rounded-2xl px-6"
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="rounded-2xl px-6"
                >
                  Cancel
                </Button>
              </div>
            )}

            {!isCurrentUser && (
              <Button
                onClick={handleChatSeller}
                className="w-full md:w-auto rounded-2xl bg-emerald-600 font-bold h-12 px-8 gap-2 hover:bg-emerald-700"
              >
                <MessageCircle className="w-5 h-5" />
                Chat Seller
              </Button>
            )}

            <Button
              variant="outline"
              className="w-full md:w-auto rounded-2xl border-neutral-200 font-bold h-12 px-8"
            >
              Share Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
