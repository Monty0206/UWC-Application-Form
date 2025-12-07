import { useState, useEffect } from 'react';
import { X, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HelpBubbleProps {
  message: string;
  tip?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onDismiss?: () => void;
  autoHide?: number;
  className?: string;
}

export const HelpBubble = ({ 
  message, 
  tip,
  position = 'bottom-right',
  onDismiss,
  autoHide,
  className
}: HelpBubbleProps) => {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHide);
      return () => clearTimeout(timer);
    }
  }, [autoHide]);

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, 300);
  };

  if (!visible) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
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
      <div className="relative bg-card rounded-2xl shadow-lg p-4 border border-border overflow-hidden group">
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-uwc-gold to-uwc-light-gold" />
        
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
        
        {/* Content */}
        <div className="flex gap-3 pr-6">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-uwc-gold/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-uwc-gold animate-pulse-soft" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{message}</p>
            {tip && (
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <ArrowRight className="w-3 h-3" />
                {tip}
              </p>
            )}
          </div>
        </div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
};
