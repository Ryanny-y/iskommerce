import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function VerificationPage() {
  const navigate = useNavigate();
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsResending(false);
    setCountdown(60);
    toast.info('Verification email resent!');
  };

  const handleVerify = async () => {
    // In a real app, this would check the backend
    toast.success('Email verified successfully!');
    navigate('/login');
  };

  return (
    <Card className="border-none shadow-xl shadow-neutral-200/50 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-emerald-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">Check your email</CardTitle>
        <CardDescription className="text-center">
          We've sent a verification link to <br />
          <span className="font-bold text-neutral-900">juan.delacruz@university.edu</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 text-sm text-neutral-600 leading-relaxed">
          <p className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            Click the link in the email to verify your account and start trading.
          </p>
        </div>

        <Button 
          className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all"
          onClick={handleVerify}
        >
          I've verified my email <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <p className="text-center text-sm text-neutral-500">
          Didn't receive the email?{' '}
          <button 
            onClick={handleResend}
            disabled={isResending || countdown > 0}
            className="font-bold text-emerald-600 hover:underline disabled:opacity-50 disabled:no-underline flex items-center gap-1 mx-auto"
          >
            {isResending ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : null}
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend email'}
          </button>
        </p>
      </CardFooter>
    </Card>
  );
}
