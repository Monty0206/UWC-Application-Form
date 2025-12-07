import { useState, useEffect } from 'react';
import { Save, HelpCircle, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import uwcLogo from '@/assets/uwc-logo.png';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onSave: () => void;
  onHelp: () => void;
}

export const Header = ({ onSave, onHelp }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-primary/95 backdrop-blur-xl shadow-lg py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={uwcLogo} 
                alt="University of the Western Cape" 
                className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-uwc-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-serif">
                <span className="text-sm md:text-base font-bold tracking-wide">
                  UNIVERSITY <span className="text-uwc-gold text-xs">of the</span> WESTERN CAPE
                </span>
              </div>
              <p className="text-uwc-gold text-xs font-medium tracking-widest uppercase">
                Application Portal 2025
              </p>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="glass"
              size="sm"
              onClick={onSave}
              className="group"
            >
              <Save className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Save Progress</span>
            </Button>
            <Button
              variant="gold-outline"
              size="sm"
              onClick={onHelp}
              className="group"
            >
              <HelpCircle className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span>Help</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Button variant="glass" onClick={onSave} className="justify-start">
                <Save className="w-4 h-4 mr-2" />
                Save Progress
              </Button>
              <Button variant="gold-outline" onClick={onHelp} className="justify-start">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
