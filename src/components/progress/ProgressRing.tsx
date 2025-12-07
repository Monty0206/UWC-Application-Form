import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const ProgressRing = ({ 
  progress, 
  size = 120, 
  strokeWidth = 8,
  className 
}: ProgressRingProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    // Animate progress change
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/10"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: 'drop-shadow(0 0 8px hsla(43, 91%, 61%, 0.5))',
          }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(43, 91%, 61%)" />
            <stop offset="100%" stopColor="hsl(43, 100%, 70%)" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{Math.round(animatedProgress)}%</span>
        <span className="text-xs text-white/60 uppercase tracking-wider">Complete</span>
      </div>
      
      {/* Glow effect */}
      {progress > 0 && (
        <div 
          className="absolute inset-0 rounded-full opacity-30 blur-xl"
          style={{
            background: `conic-gradient(from 0deg, hsl(43, 91%, 61%) ${progress}%, transparent ${progress}%)`,
          }}
        />
      )}
    </div>
  );
};
