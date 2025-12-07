import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  isActive?: boolean;
}

export const FormSection = ({ 
  title, 
  description, 
  icon,
  children, 
  className,
  isActive = true
}: FormSectionProps) => {
  return (
    <section 
      className={cn(
        "bg-card rounded-2xl shadow-lg border border-border overflow-hidden transition-all duration-500",
        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none absolute",
        className
      )}
    >
      {/* Header with gradient accent */}
      <div className="relative px-6 py-5 border-b border-border bg-gradient-to-r from-muted/50 to-transparent">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-uwc-gold to-uwc-light-gold" />
        
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-uwc-gold/10 flex items-center justify-center text-uwc-gold">
              {icon}
            </div>
          )}
          <div>
            <h2 className="text-xl font-serif font-bold text-foreground">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </section>
  );
};
