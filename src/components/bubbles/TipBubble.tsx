import { useState, useEffect } from 'react';
import { X, Lightbulb, Rocket, Heart, Star, Zap, Trophy, Target, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

type BubbleType = 'tip' | 'encouragement' | 'milestone' | 'warning' | 'celebration';

interface TipBubbleProps {
  message: string;
  subMessage?: string;
  type?: BubbleType;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-bottom';
  onDismiss?: () => void;
  autoHide?: number;
  delay?: number;
  className?: string;
}

const typeConfig = {
  tip: {
    icon: Lightbulb,
    gradient: 'from-uwc-gold to-uwc-light-gold',
    bgColor: 'bg-uwc-gold/10',
    borderColor: 'border-uwc-gold/30',
    iconColor: 'text-uwc-gold',
  },
  encouragement: {
    icon: Heart,
    gradient: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    iconColor: 'text-pink-500',
  },
  milestone: {
    icon: Trophy,
    gradient: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-500',
  },
  warning: {
    icon: Zap,
    gradient: 'from-yellow-400 to-amber-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    iconColor: 'text-yellow-500',
  },
  celebration: {
    icon: Star,
    gradient: 'from-uwc-gold via-uwc-light-gold to-uwc-gold',
    bgColor: 'bg-uwc-gold/10',
    borderColor: 'border-uwc-gold/40',
    iconColor: 'text-uwc-gold',
  },
};

export const TipBubble = ({ 
  message, 
  subMessage,
  type = 'tip',
  position = 'bottom-right',
  onDismiss,
  autoHide,
  delay = 0,
  className
}: TipBubbleProps) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const config = typeConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(showTimer);
  }, [delay]);

  useEffect(() => {
    if (visible && autoHide) {
      const hideTimer = setTimeout(() => handleDismiss(), autoHide);
      return () => clearTimeout(hideTimer);
    }
  }, [visible, autoHide]);

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, 300);
  };

  if (!visible) return null;

  const positionClasses = {
    'top-left': 'top-20 left-4',
    'top-right': 'top-20 right-4',
    'bottom-left': 'bottom-24 left-4',
    'bottom-right': 'bottom-24 right-4',
    'center-bottom': 'bottom-24 left-1/2 -translate-x-1/2',
  };

  return (
    <div 
      className={cn(
        "fixed z-50 max-w-sm",
        positionClasses[position],
        exiting ? "animate-fade-out" : "animate-slide-in-right",
        className
      )}
    >
      <div className={cn(
        "relative bg-card rounded-2xl shadow-lg p-4 border overflow-hidden group transition-all duration-300 hover:scale-[1.02]",
        config.borderColor
      )}>
        {/* Animated gradient bar */}
        <div className={cn(
          "absolute top-0 left-0 w-full h-1 bg-gradient-to-r",
          config.gradient
        )} />
        
        {/* Glow effect */}
        <div className={cn(
          "absolute -top-10 -right-10 w-20 h-20 rounded-full blur-2xl opacity-30",
          config.bgColor
        )} />
        
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors z-10"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
        
        {/* Content */}
        <div className="flex gap-3 pr-6 relative">
          <div className="flex-shrink-0">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              config.bgColor
            )}>
              <Icon className={cn("w-5 h-5 animate-pulse-soft", config.iconColor)} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground leading-snug">{message}</p>
            {subMessage && (
              <p className="text-xs text-muted-foreground mt-1">{subMessage}</p>
            )}
          </div>
        </div>
        
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
};
