import { useState, useEffect } from 'react';
import { X, Sparkles, GraduationCap, Rocket, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WelcomeMascotProps {
  step: number;
  userName?: string;
  onDismiss?: () => void;
}

const stepMessages = [
  {
    icon: Sparkles,
    title: "Welcome to UWC!",
    message: "Let's start your journey to success. This form saves automatically!",
    color: "text-uwc-gold",
  },
  {
    icon: GraduationCap,
    title: "Academic Details",
    message: "Tell us about your educational journey. Every achievement counts!",
    color: "text-success",
  },
  {
    icon: Rocket,
    title: "You're doing great!",
    message: "Keep going! Upload your documents to strengthen your application.",
    color: "text-uwc-gold",
  },
  {
    icon: PartyPopper,
    title: "Almost there!",
    message: "Just a few more steps and you'll be ready to submit!",
    color: "text-success",
  },
];

export const WelcomeMascot = ({ step, userName, onDismiss }: WelcomeMascotProps) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  
  const messageIndex = Math.min(step - 1, stepMessages.length - 1);
  const currentMessage = stepMessages[messageIndex];
  const Icon = currentMessage.icon;

  useEffect(() => {
    // Show mascot after a short delay
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 500);

    // Auto-hide after 6 seconds
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 6500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [step]);

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-24 right-4 z-40 animate-slide-in-right">
      <div className="relative">
        {/* Speech bubble */}
        <div className="bg-card rounded-2xl shadow-lg p-4 max-w-xs border border-border relative">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center shadow-sm hover:bg-muted/80 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
          
          <div className="flex items-start gap-3">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-uwc-gold/20 to-uwc-light-gold/10 animate-bounce-gentle",
              currentMessage.color
            )}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">
                {userName ? `Hey ${userName}! ` : ''}{currentMessage.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {currentMessage.message}
              </p>
            </div>
          </div>
          
          {/* Bubble tail */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-card border-b border-r border-border rotate-45 transform" />
        </div>
      </div>
    </div>
  );
};
