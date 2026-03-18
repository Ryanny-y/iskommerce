import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function VerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email as string | undefined;

  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    setIsResending(true);
    // Mock resend delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsResending(false);
    setCountdown(60);
    toast.info("Verification email resent!");
  };

  const handleVerify = async () => {
    if (otp.length < 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }

    // In a real app, send `otp` to backend for verification
    toast.success("Email verified successfully!");
    navigate("/login");
  };

  return (
    <Card className="border-none shadow-xl shadow-neutral-200/50 bg-white/80 backdrop-blur-sm py-8">
      <CardHeader className="space-y-1">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-2">
          <Mail className="w-8 h-8 text-emerald-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Verify your email
        </CardTitle>
        <CardDescription className="text-center">
          Enter the 6-digit code sent to <br />
          <span className="font-bold text-neutral-900">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            pattern={REGEXP_ONLY_DIGITS}
            onChange={setOtp}
          >
            <InputOTPGroup>
              <InputOTPSlot className="h-12 w-12" index={0} />
              <InputOTPSlot className="h-12 w-12" index={1} />
              <InputOTPSlot className="h-12 w-12" index={2} />
              <InputOTPSlot className="h-12 w-12" index={3} />
              <InputOTPSlot className="h-12 w-12" index={4} />
              <InputOTPSlot className="h-12 w-12" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          className="w-4/5 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all"
          onClick={handleVerify}
        >
          Verify <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <p className="text-center text-sm text-neutral-500">
          Didn't receive the email?{" "}
          <button
            onClick={handleResend}
            disabled={isResending || countdown > 0}
            className="font-bold text-emerald-600 hover:underline disabled:opacity-50 disabled:no-underline flex items-center gap-1 mx-auto"
          >
            {isResending ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : null}
            {countdown > 0 ? `Resend in ${countdown}s` : "Resend email"}
          </button>
        </p>
      </CardFooter>
    </Card>
  );
}
