import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export const ToolCard = ({ icon, title, description, onClick, className }: ToolCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative bg-card rounded-2xl p-5 border border-border text-left transition-all duration-300",
        "hover:border-uwc-gold/50 hover:shadow-lg hover:-translate-y-1",
        "focus:outline-none focus:ring-2 focus:ring-uwc-gold focus:ring-offset-2",
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-uwc-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-uwc-gold/10 flex items-center justify-center text-uwc-gold mb-3 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
          {title}
          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-uwc-gold" />
        </h3>
        
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
        <div className="absolute top-0 right-0 w-24 h-1 bg-gradient-to-l from-uwc-gold to-transparent transform rotate-45 translate-x-8 -translate-y-4" />
      </div>
    </button>
  );
};
