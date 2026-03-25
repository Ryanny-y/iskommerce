import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const PendingApprovalPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email as string | undefined;

  console.log(email);
  
  useEffect(() => {
    if (!email) navigate("/login");
  }, [email]);

  const handleLogout = () => {
    navigate("/login");
  };
  
  return (
    <div
      id="hello"    
      className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 md:p-12"
    >
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg" 
      >
        <Card className="overflow-hidden border-none shadow-2xl shadow-neutral-200/50 rounded-[48px] bg-white p-2">
          <div className="bg-neutral-50 rounded-[40px] p-8 md:p-12 text-center space-y-8">
            {/* Icon Section */}
            <div className="relative inline-block">
              <div className="h-24 w-24 rounded-[32px] bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-100/50">
                <Clock className="h-10 w-10 animate-pulse" />
              </div>
              <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-lg border-4 border-neutral-50">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-neutral-900 tracking-tight leading-tight">
                Account Pending Approval
              </h2>
              <div className="space-y-4 text-neutral-500 font-medium text-lg leading-relaxed">
                <p>Your account has been successfully verified!</p>
                <p className="text-base">
                  Please wait for the admin to approve your account before you
                  can access the marketplace. This usually takes a short time.
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest">
                Status: Pending Approval
              </span>
            </div>

            {/* Tip */}
            {/* <div className="flex items-start gap-3 p-4 rounded-3xl bg-white border border-neutral-100 text-left">
              <AlertCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-neutral-400 leading-relaxed">
                <span className="font-bold text-neutral-600">Pro Tip:</span> You
                will be notified via email once your account is approved. You
                can also refresh this page to check the status.
              </p>
            </div> */}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex-1 h-14 rounded-2xl font-bold text-neutral-500 hover:bg-neutral-100 transition-all active:scale-95 gap-2"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default PendingApprovalPage;
