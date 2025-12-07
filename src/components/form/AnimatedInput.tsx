import { forwardRef, useState, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ className, icon, rightIcon, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [filled, setFilled] = useState(!!props.value || !!props.defaultValue);

    return (
      <div className={cn(
        "relative group",
        className
      )}>
        {/* Left icon */}
        {icon && (
          <div className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200",
            focused ? "text-uwc-gold" : "text-muted-foreground"
          )}>
            {icon}
          </div>
        )}
        
        {/* Input */}
        <input
          ref={ref}
          className={cn(
            "w-full h-12 px-4 rounded-xl border-2 bg-background text-foreground transition-all duration-200",
            "placeholder:text-muted-foreground/60",
            "focus:outline-none focus:border-uwc-gold focus:ring-4 focus:ring-uwc-gold/10",
            "hover:border-muted-foreground/30",
            icon && "pl-10",
            rightIcon && "pr-10",
            focused && "border-uwc-gold shadow-sm",
            !focused && "border-input"
          )}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            setFilled(!!e.target.value);
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setFilled(!!e.target.value);
            props.onChange?.(e);
          }}
          {...props}
        />
        
        {/* Right icon */}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
        
        {/* Bottom highlight animation */}
        <div className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-uwc-gold to-uwc-light-gold transition-all duration-300",
          focused ? "w-[calc(100%-4px)]" : "w-0"
        )} />
      </div>
    );
  }
);

AnimatedInput.displayName = 'AnimatedInput';
