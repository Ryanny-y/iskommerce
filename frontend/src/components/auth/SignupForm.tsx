import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User, ShieldCheck } from "lucide-react";
import { signupSchema, type SignupFormValues } from "./types";
import useAuth from "@/contexts/AuthContext";
import type { Role } from "@/types/User";

export default function SignupForm() {
  const location = useLocation();
  const roles = location.state?.roles as Role[] | undefined;

  useEffect(() => {
    if(!roles) {
      navigate("/role-selection")
    }
  }, [roles])
  

  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      roles: roles || [],
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      setIsLoading(true);

      await signup(data);

      toast.success("Account created! Please log in.");
      navigate("/verify");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
          <Input
            id="fullName"
            placeholder="Juan Dela Cruz"
            className="pl-10 h-11 bg-neutral-50/50 border-neutral-200 focus:bg-white transition-all"
            {...register("fullName")}
          />
        </div>
        {errors.fullName && (
          <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">University Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
          <Input
            id="email"
            type="email"
            placeholder="name@student.fatima.edu.ph"
            className="pl-10 h-11 bg-neutral-50/50 border-neutral-200 focus:bg-white transition-all"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-10 h-11 bg-neutral-50/50 border-neutral-200 focus:bg-white transition-all"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm</Label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="pl-10 h-11 bg-neutral-50/50 border-neutral-200 focus:bg-white transition-all"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <p className="text-[10px] text-neutral-400 leading-tight">
        By signing up, you agree to our{" "}
        <Link to="#" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="#" className="underline">
          Privacy Policy
        </Link>
        .
      </p>

      <Button
        type="submit"
        className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Sign up"
        )}
      </Button>
    </form>
  );
}
