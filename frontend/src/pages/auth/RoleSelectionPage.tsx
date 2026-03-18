import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag, Store, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Role } from "@/types/User";

export default function RoleSelectionPage() {
  const navigate = useNavigate();
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  
  const handleContinue = async () => {
    if (!selectedRoles) return;
    toast.success(`Role set to ${selectedRoles}!`);
    navigate("/signup", { state: { roles: selectedRoles } });
  };

  const toggleRole = (role: Role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  return (
    <Card className="border-none shadow-xl shadow-neutral-200/50 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Choose your role
        </CardTitle>
        <CardDescription className="text-center">
          How do you plan to use Iskommerce?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <RoleOption
            id="buyer"
            title="I want to Buy"
            description="Browse textbooks, gadgets, and more from fellow students."
            icon={<ShoppingBag className="w-6 h-6" />}
            selected={selectedRoles.includes("BUYER")}
            onClick={() => toggleRole("BUYER")}
          />
          <RoleOption
            id="seller"
            title="I want to Sell"
            description="List your items or services and earn extra cash on campus."
            icon={<Store className="w-6 h-6" />}
            selected={selectedRoles.includes("SELLER")}
            onClick={() => toggleRole("SELLER")}
          />
        </div>

        <Button
          className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all"
          disabled={selectedRoles.length === 0}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}

function RoleOption({
  title,
  description,
  icon,
  selected,
  onClick,
}: {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4",
        selected
          ? "border-emerald-600 bg-emerald-50/50 ring-4 ring-emerald-50"
          : "border-neutral-100 bg-white hover:border-emerald-200 hover:bg-neutral-50/50",
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
          selected
            ? "bg-emerald-600 text-white"
            : "bg-neutral-100 text-neutral-500",
        )}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3
          className={cn(
            "font-bold text-lg mb-1",
            selected ? "text-emerald-900" : "text-neutral-900",
          )}
        >
          {title}
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed">
          {description}
        </p>
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 text-emerald-600"
        >
          <CheckCircle2 className="w-6 h-6 fill-emerald-600 text-white" />
        </motion.div>
      )}
    </div>
  );
}
