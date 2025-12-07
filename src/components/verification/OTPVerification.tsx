import { useState, useEffect } from 'react';
import { Smartphone, CheckCircle2, RefreshCw, Shield, Sparkles } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OTPVerificationProps {
  phoneNumber: string;
  onVerify: (code: string) => void;
  onResend: () => void;
  isVerified?: boolean;
}

export const OTPVerification = ({ 
  phoneNumber, 
  onVerify, 
  onResend,
  isVerified = false 
}: OTPVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [showSuccess, setShowSuccess] = useState(isVerified);

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    
    setIsVerifying(true);
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowSuccess(true);
    setIsVerifying(false);
    onVerify(otp);
  };

  const handleResend = () => {
    setCanResend(false);
    setCountdown(30);
    setOtp('');
    onResend();
  };

  const maskedPhone = phoneNumber 
    ? phoneNumber.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2')
    : '+27 XXX **** XXX';

  if (showSuccess) {
    return (
      <div className="relative bg-card rounded-2xl border border-success/30 p-6 overflow-hidden">
        {/* Success background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-transparent to-success/10" />
        
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center bounce-in">
            <CheckCircle2 className="w-7 h-7 text-success success-check" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              Phone Verified
              <Sparkles className="w-4 h-4 text-uwc-gold animate-pulse-soft" />
            </h3>
            <p className="text-sm text-muted-foreground">{maskedPhone}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-card rounded-2xl border border-border p-6 overflow-hidden fade-slide-in">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-uwc-gold via-uwc-light-gold to-uwc-gold shimmer" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-uwc-gold/5 rounded-full blur-3xl" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center animate-bounce-gentle">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Verify Your Phone</h3>
            <p className="text-sm text-muted-foreground">
              Demo OTP sent to {maskedPhone}
            </p>
          </div>
        </div>

        {/* Demo notice */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-uwc-gold/10 border border-uwc-gold/20 mb-6 animate-fade-in">
          <Shield className="w-4 h-4 text-uwc-gold flex-shrink-0" />
          <p className="text-xs text-foreground/80">
            <span className="font-semibold text-uwc-gold">Demo Mode:</span> This shows how OTP verification would work. Enter any 6 digits to test.
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex flex-col items-center gap-6">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            className="gap-2"
          >
            <InputOTPGroup className="gap-2">
              <InputOTPSlot 
                index={0} 
                className="w-12 h-14 text-lg font-bold rounded-xl border-2 border-input bg-background transition-all duration-200 focus:border-uwc-gold focus:ring-4 focus:ring-uwc-gold/20"
              />
              <InputOTPSlot 
                index={1} 
                className="w-12 h-14 text-lg font-bold rounded-xl border-2 border-input bg-background transition-all duration-200 focus:border-uwc-gold focus:ring-4 focus:ring-uwc-gold/20"
              />
              <InputOTPSlot 
                index={2} 
                className="w-12 h-14 text-lg font-bold rounded-xl border-2 border-input bg-background transition-all duration-200 focus:border-uwc-gold focus:ring-4 focus:ring-uwc-gold/20"
              />
            </InputOTPGroup>
            <InputOTPSeparator className="text-muted-foreground">-</InputOTPSeparator>
            <InputOTPGroup className="gap-2">
              <InputOTPSlot 
                index={3} 
                className="w-12 h-14 text-lg font-bold rounded-xl border-2 border-input bg-background transition-all duration-200 focus:border-uwc-gold focus:ring-4 focus:ring-uwc-gold/20"
              />
              <InputOTPSlot 
                index={4} 
                className="w-12 h-14 text-lg font-bold rounded-xl border-2 border-input bg-background transition-all duration-200 focus:border-uwc-gold focus:ring-4 focus:ring-uwc-gold/20"
              />
              <InputOTPSlot 
                index={5} 
                className="w-12 h-14 text-lg font-bold rounded-xl border-2 border-input bg-background transition-all duration-200 focus:border-uwc-gold focus:ring-4 focus:ring-uwc-gold/20"
              />
            </InputOTPGroup>
          </InputOTP>

          {/* Verify Button */}
          <Button
            variant="gold"
            size="lg"
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying}
            className={cn(
              "w-full max-w-xs gap-2 transition-all duration-300",
              otp.length === 6 && "glow-gold"
            )}
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Verify Code
              </>
            )}
          </Button>

          {/* Resend */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Didn't receive the code?
            </p>
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-sm font-medium text-uwc-gold hover:text-uwc-light-gold transition-colors underline-offset-4 hover:underline"
              >
                Resend Code
              </button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Resend in <span className="font-semibold text-foreground">{countdown}s</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
