import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  label: string;
  icon?: React.ReactNode;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (step: number) => void;
}

export const StepIndicator = ({ 
  steps, 
  currentStep, 
  completedSteps,
  onStepClick 
}: StepIndicatorProps) => {
  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex items-center justify-between min-w-max px-4 md:px-0">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const isPast = step.id < currentStep || isCompleted;
          
          return (
            <div key={step.id} className="flex items-center">
              {/* Step circle */}
              <button
                onClick={() => onStepClick?.(step.id)}
                disabled={!isPast && !isCurrent}
                className={cn(
                  "relative flex flex-col items-center group transition-all duration-300",
                  (isPast || isCurrent) ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                )}
              >
                {/* Circle */}
                <div
                  className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 relative",
                    isCompleted && "bg-success text-success-foreground shadow-md",
                    isCurrent && "bg-uwc-gold text-uwc-dark-blue shadow-gold scale-110",
                    !isCompleted && !isCurrent && "bg-white/10 text-white/50 border-2 border-white/20"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 animate-fade-in" />
                  ) : (
                    <span className="text-sm font-bold">{step.id}</span>
                  )}
                  
                  {/* Pulse animation for current step */}
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-uwc-gold animate-ping opacity-30" />
                  )}
                </div>
                
                {/* Label */}
                <span 
                  className={cn(
                    "mt-2 text-xs font-medium text-center max-w-[60px] md:max-w-[80px] transition-colors duration-300",
                    isCurrent ? "text-uwc-gold" : isCompleted ? "text-white" : "text-white/50"
                  )}
                >
                  {step.label}
                </span>
                
                {/* Tooltip on hover */}
                <div className={cn(
                  "absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-card text-card-foreground rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap text-xs z-10",
                  !isPast && !isCurrent && "hidden"
                )}>
                  {isCompleted ? "Completed" : isCurrent ? "Current Step" : "Click to edit"}
                </div>
              </button>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="w-8 md:w-16 lg:w-24 h-0.5 mx-1 md:mx-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10" />
                  <div 
                    className={cn(
                      "absolute inset-y-0 left-0 bg-gradient-to-r from-uwc-gold to-uwc-light-gold transition-all duration-500",
                      isPast ? "w-full" : isCurrent ? "w-1/2" : "w-0"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
