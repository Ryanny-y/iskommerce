import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StartSellingHero } from "@/components/seller/StartSellingHero";
import { SellerBenefits } from "@/components/seller/SellerBenefits";
import { toast } from "sonner";
import { motion } from "motion/react";
import useMutation from "@/hooks/useMutation";
import type { ApiResponse } from "@/types/common";
import useAuth from "@/contexts/AuthContext";

const StartSellingPage: React.FC = () => {
  const navigate = useNavigate();
  const { authResponse, refreshToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { execute } = useMutation();

  useEffect(() => {
    const isSeller = authResponse?.userData.roles.includes("SELLER");
    if (isSeller) {
      navigate("/my-listings", { replace: true });
    }
  }, [navigate, authResponse]);

  const handleActivateSeller = async () => {
    setIsLoading(true);
    try {
      // Mock API call to activate seller status
      const response: ApiResponse<void> = await execute("auth/make-seller", {
        method: "POST",
      });
      
      await refreshToken();
      toast.success(response.message);
      navigate("/my-listings");
    } catch (error: any) {
      toast.error("Failed to activate seller account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <StartSellingHero
            onActivate={handleActivateSeller}
            isLoading={isLoading}
          />

          {/* <div className="max-w-6xl mx-auto px-4 pb-24">
            <div className="relative aspect-video md:aspect-[21/9] rounded-[40px] overflow-hidden border border-neutral-100 shadow-2xl shadow-neutral-200/50 bg-neutral-100 group">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200" 
                alt="Student selling items" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-12">
                <div className="max-w-lg space-y-2">
                  <h3 className="text-2xl font-bold text-white">Join the Community</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    "I sold all my old textbooks in just two days! Iskommerce made it so easy to find buyers right here on campus."
                    <span className="block mt-2 font-bold text-emerald-400">— Maria, UP Diliman Student</span>
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          <SellerBenefits />
        </motion.div>
      </main>

      <footer className="py-20 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-8">
          <div className="text-2xl font-black tracking-tighter text-emerald-500">
            Iskommerce
          </div>
          <p className="text-neutral-400 max-w-md mx-auto">
            The most trusted campus marketplace for students, by students.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm font-bold text-neutral-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
          <div className="pt-8 border-t border-white/5 text-neutral-600 text-xs">
            © 2026 Iskommerce. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StartSellingPage;
