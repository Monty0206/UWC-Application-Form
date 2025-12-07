import { Phone, Mail, MessageCircle, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HelpDialog = ({ open, onOpenChange }: HelpDialogProps) => {
  const helpOptions = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak to an admissions officer',
      action: 'tel:+27219592911',
      label: '+27 21 959 2911',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      action: 'mailto:admissions@uwc.ac.za',
      label: 'admissions@uwc.ac.za',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Chat with us on WhatsApp',
      action: 'https://wa.me/27219592911',
      label: 'Start Chat',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Need Help?</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Our admissions team is here to help you complete your application. 
            Choose your preferred way to reach us:
          </p>
          
          <div className="space-y-3">
            {helpOptions.map((option) => (
              <a
                key={option.title}
                href={option.action}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-uwc-gold/50 hover:bg-muted/50 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-full bg-uwc-gold/10 flex items-center justify-center text-uwc-gold group-hover:scale-110 transition-transform">
                  <option.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{option.title}</h4>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <div className="text-sm text-uwc-gold flex items-center gap-1">
                  {option.label}
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
          
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Office hours: Monday - Friday, 8:00 AM - 4:30 PM (SAST)
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
