import React, { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Lock, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import useAdminAuth from "@/contexts/AdminAuthContext";
import { getErrorMessage } from "@/utils/errorHandlers";

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAdminAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await login(email, password);
      console.log(response);
      
      toast.success("Successfully logged in!");
      navigate("/admin/users");
    } catch (error: any) {
      toast.error(getErrorMessage(error) || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/30 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-none shadow-2xl shadow-neutral-200/50 rounded-[48px] bg-white overflow-hidden">
          <CardHeader className="pt-12 pb-8 px-8 text-center space-y-4 w-full flex flex-col items-center ">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-[28px] bg-emerald-600 text-white mb-2">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-black text-neutral-900 tracking-tight">
                Admin Portal
              </CardTitle>
              <CardDescription className="text-neutral-500 font-medium text-base">
                Secure access for Iskommerce administrators.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-12">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1"
                  >
                    Admin Email
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 group-focus-within:text-emerald-600 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@iskommerce.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-14 pl-12 pr-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1"
                  >
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 group-focus-within:text-emerald-600 transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-14 pl-12 pr-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all outline-none font-medium"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-bold text-lg transition-all active:scale-95 gap-2"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Login to Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-bold text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                Return to User Login
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-xs font-bold text-neutral-400 uppercase tracking-widest">
          © 2026 Iskommerce Admin System • v1.0.4
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
