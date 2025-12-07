import { ReactNode, useState } from 'react';
import { Info, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  required?: boolean;
  tooltip?: string;
  error?: string;
  success?: boolean;
  children: ReactNode;
  className?: string;
}

export const FormField = ({ 
  label, 
  required, 
  tooltip, 
  error, 
  success,
  children,
  className 
}: FormFieldProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={cn("relative group", className)}>
      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        
        {tooltip && (
          <div className="relative">
            <button
              type="button"
              className="p-1 rounded-full hover:bg-muted transition-colors"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            
            {showTooltip && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 animate-fade-in">
                <div className="bg-foreground text-background text-xs px-3 py-2 rounded-lg shadow-lg max-w-[200px] whitespace-normal">
                  {tooltip}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-foreground" />
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Status indicators */}
        {success && !error && (
          <Check className="w-4 h-4 text-success animate-fade-in" />
        )}
        {error && (
          <AlertCircle className="w-4 h-4 text-destructive animate-wiggle" />
        )}
      </div>
      
      <div className="relative">
        {children}
        
        {/* Success glow effect */}
        {success && !error && (
          <div className="absolute inset-0 rounded-lg ring-2 ring-success/20 pointer-events-none animate-fade-in" />
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <p className="mt-1.5 text-xs text-destructive flex items-center gap-1 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};
