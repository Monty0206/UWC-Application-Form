import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ChevronLeft, ChevronRight, Compass, Calculator, ClipboardCheck, Smartphone, Zap, Sparkles, Star } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { PersonalInfoSection } from '@/components/sections/PersonalInfoSection';
import { AcademicSection } from '@/components/sections/AcademicSection';
import { StepIndicator } from '@/components/progress/StepIndicator';
import { ProgressRing } from '@/components/progress/ProgressRing';
import { ToolCard } from '@/components/cards/ToolCard';
import { HelpBubble } from '@/components/bubbles/HelpBubble';
import { WelcomeMascot } from '@/components/bubbles/WelcomeMascot';
import { BubbleManager } from '@/components/bubbles/BubbleManager';
import { Confetti } from '@/components/effects/Confetti';
import { HelpDialog } from '@/components/dialogs/HelpDialog';
import { FloatingParticles } from '@/components/particles/FloatingParticles';
import { Button } from '@/components/ui/button';
import { useApplicationForm } from '@/hooks/useApplicationForm';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, label: 'Personal' },
  { id: 2, label: 'Academic' },
  { id: 3, label: 'Documents' },
  { id: 4, label: 'Statement' },
  { id: 5, label: 'Activities' },
  { id: 6, label: 'Experience' },
  { id: 7, label: 'References' },
  { id: 8, label: 'Residence' },
  { id: 9, label: 'Financial' },
  { id: 10, label: 'Review' },
];

const Index = () => {
  const {
    formData,
    currentStep,
    completedSteps,
    progress,
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    saveProgress,
  } = useApplicationForm();

  const [showHero, setShowHero] = useState(true);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHelpBubble, setShowHelpBubble] = useState(false);
  const [lowDataMode, setLowDataMode] = useState(false);

  useEffect(() => {
    // Show help bubble after 3 seconds on first visit
    const timer = setTimeout(() => {
      if (progress === 0) {
        setShowHelpBubble(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Show confetti when completing a step
  useEffect(() => {
    if (completedSteps.length > 0 && completedSteps[completedSteps.length - 1] === currentStep - 1) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [completedSteps, currentStep]);

  const handleStartApplication = () => {
    setShowHero(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentSection = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoSection
            data={formData.personal}
            onChange={(data) => updateFormData('personal', data)}
          />
        );
      case 2:
        return (
          <AcademicSection
            data={formData.academic}
            onChange={(data) => updateFormData('academic', data)}
          />
        );
      default:
        return (
          <div className="bg-card rounded-2xl shadow-lg border border-border p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-uwc-gold/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-uwc-gold" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
              Section Coming Soon
            </h2>
            <p className="text-muted-foreground mb-6">
              This section is being prepared. For now, you can continue with other sections.
            </p>
            <Button variant="gold" onClick={nextStep}>
              Continue to Next Section
            </Button>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>UWC Application Portal 2025 | University of the Western Cape</title>
        <meta name="description" content="Apply to the University of the Western Cape. Our streamlined application portal guides you through every step of your journey to higher education." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Confetti effect */}
        <Confetti active={showConfetti} />

        {/* Bubble Manager - Smart contextual messages */}
        {!showHero && (
          <BubbleManager
            currentStep={currentStep}
            progress={progress}
            formStarted={!showHero}
            userName={formData.personal.firstName}
          />
        )}

        {/* Help bubble */}
        {showHelpBubble && (
          <HelpBubble
            message="Need help? Click the Help button anytime!"
            tip="Your progress saves automatically"
            autoHide={8000}
            onDismiss={() => setShowHelpBubble(false)}
          />
        )}

        {/* Welcome mascot */}
        {!showHero && (
          <WelcomeMascot
            step={currentStep}
            userName={formData.personal.firstName}
          />
        )}

        {/* Hero or Application */}
        {showHero ? (
          <>
            <Header onSave={saveProgress} onHelp={() => setHelpDialogOpen(true)} />
            <HeroSection 
              progress={progress} 
              onStartApplication={handleStartApplication} 
            />
            
            {/* Quick Tools Section */}
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
                    Helpful Tools
                  </h2>
                  <p className="text-muted-foreground">
                    Not sure where to start? These tools can help guide you.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <ToolCard
                    icon={<Compass className="w-6 h-6" />}
                    title="Program Finder"
                    description="Not sure what to study? Find the perfect program for you."
                    onClick={() => {}}
                  />
                  <ToolCard
                    icon={<Calculator className="w-6 h-6" />}
                    title="APS Calculator"
                    description="Calculate your admission point score instantly."
                    onClick={() => {}}
                  />
                  <ToolCard
                    icon={<ClipboardCheck className="w-6 h-6" />}
                    title="Track Status"
                    description="Already applied? Check your application status."
                    onClick={() => {}}
                  />
                </div>
              </div>
            </section>

            {/* Low Data Mode Banner */}
            <section className="bg-primary text-primary-foreground py-4">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-4 text-center">
                  <Smartphone className="w-5 h-5 text-uwc-gold" />
                  <span className="text-sm">
                    <strong>Low Data Mode Available:</strong>{' '}
                    <button 
                      onClick={() => setLowDataMode(!lowDataMode)}
                      className="underline hover:no-underline text-uwc-gold"
                    >
                      {lowDataMode ? 'Switch to full version' : 'Switch to low-data version'}
                    </button>
                  </span>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Application Form View */}
            <div className="min-h-screen bg-hero-gradient relative overflow-hidden">
              {/* Subtle animated background */}
              <div className="absolute inset-0 opacity-20">
                <FloatingParticles />
              </div>
              
              <Header onSave={saveProgress} onHelp={() => setHelpDialogOpen(true)} />
              
              {/* Progress Section */}
              <div className="pt-24 pb-8 px-4 relative z-10">
                <div className="container mx-auto">
                  <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
                    {/* Progress Ring with animation */}
                    <div className="flex-shrink-0 animate-fade-in">
                      <ProgressRing progress={progress} size={100} />
                    </div>
                    
                    {/* Step Indicator */}
                    <div className="flex-1 w-full overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
                      <StepIndicator
                        steps={steps}
                        currentStep={currentStep}
                        completedSteps={completedSteps}
                        onStepClick={goToStep}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="pb-32 relative z-10">
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    {renderCurrentSection()}
                  </div>
                </div>
              </div>

              {/* Floating Navigation */}
              <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border py-4 px-4 z-40">
                <div className="container mx-auto">
                  <div className="flex items-center justify-between max-w-3xl mx-auto">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="gap-2 transition-all duration-300 hover:scale-105"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </Button>
                    
                    <div className="text-center">
                      <div className="flex items-center gap-2 justify-center mb-1">
                        <Sparkles className="w-3 h-3 text-uwc-gold animate-pulse-soft" />
                        <p className="text-sm text-muted-foreground">
                          Step {currentStep} of {steps.length}
                        </p>
                        <Sparkles className="w-3 h-3 text-uwc-gold animate-pulse-soft" />
                      </div>
                      <p className="text-xs text-uwc-gold font-medium">
                        {steps[currentStep - 1]?.label}
                      </p>
                    </div>
                    
                    <Button
                      variant="gold"
                      onClick={nextStep}
                      className={cn(
                        "gap-2 transition-all duration-300 hover:scale-105",
                        currentStep === steps.length && "glow-gold"
                      )}
                    >
                      <span className="hidden sm:inline">
                        {currentStep === steps.length ? 'Submit' : 'Next'}
                      </span>
                      {currentStep === steps.length ? (
                        <Star className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Help Dialog */}
        <HelpDialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen} />
      </div>
    </>
  );
};

export default Index;
