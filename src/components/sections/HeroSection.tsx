import { ChevronDown, Sparkles, Users, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FloatingParticles } from '@/components/particles/FloatingParticles';
import { ProgressRing } from '@/components/progress/ProgressRing';

interface HeroSectionProps {
  progress: number;
  onStartApplication: () => void;
}

export const HeroSection = ({ progress, onStartApplication }: HeroSectionProps) => {
  const features = [
    { icon: Clock, text: 'Auto-saves your progress' },
    { icon: Shield, text: 'Secure & encrypted' },
    { icon: Users, text: 'Join 30,000+ students' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Animated particles background */}
      <FloatingParticles />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-uwc-gold/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-uwc-gold/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-uwc-gold animate-pulse-soft" />
            <span className="text-sm text-white/90">Applications Open for 2025</span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Your Future Starts{' '}
            <span className="relative">
              <span className="text-gradient-gold bg-gradient-to-r from-uwc-gold to-uwc-light-gold bg-clip-text text-transparent">Here</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8 C50 2, 150 2, 198 8" stroke="hsl(43, 91%, 61%)" strokeWidth="3" strokeLinecap="round" className="animate-draw" />
              </svg>
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Apply to the University of the Western Cape in minutes. 
            Our streamlined application process guides you every step of the way.
          </p>
          
          {/* Progress Ring (if started) */}
          {progress > 0 && (
            <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <ProgressRing progress={progress} size={140} />
              <p className="text-white/60 mt-4 text-sm">Continue where you left off</p>
            </div>
          )}
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              variant="hero" 
              size="xl"
              onClick={onStartApplication}
              className="w-full sm:w-auto group"
            >
              {progress > 0 ? 'Continue Application' : 'Start Your Application'}
              <Sparkles className="w-5 h-5 ml-1 group-hover:rotate-12 transition-transform" />
            </Button>
            <Button 
              variant="hero-outline" 
              size="xl"
              className="w-full sm:w-auto"
            >
              Learn More
            </Button>
          </div>
          
          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm"
              >
                <feature.icon className="w-4 h-4 text-uwc-gold" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
          <button 
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronDown className="w-6 h-6 text-white/70" />
          </button>
        </div>
      </div>
    </section>
  );
};
