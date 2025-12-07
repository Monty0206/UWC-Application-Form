import { useState, useEffect, useCallback } from 'react';
import { TipBubble } from './TipBubble';

interface BubbleMessage {
  id: string;
  message: string;
  subMessage?: string;
  type: 'tip' | 'encouragement' | 'milestone' | 'warning' | 'celebration';
  delay?: number;
  duration?: number;
}

interface BubbleManagerProps {
  currentStep: number;
  progress: number;
  formStarted: boolean;
  userName?: string;
}

const stepMessages: Record<number, BubbleMessage[]> = {
  1: [
    {
      id: 'welcome-1',
      message: 'Welcome! Let\'s make this application a breeze! 🌟',
      subMessage: 'Your journey to UWC starts here',
      type: 'encouragement',
      delay: 1000,
      duration: 6000,
    },
    {
      id: 'tip-photo',
      message: 'Pro tip: Use a recent passport-style photo!',
      subMessage: 'Good lighting makes a great first impression',
      type: 'tip',
      delay: 15000,
      duration: 8000,
    },
    {
      id: 'tip-email',
      message: 'Double-check your email address!',
      subMessage: 'We\'ll send important updates there',
      type: 'warning',
      delay: 30000,
      duration: 7000,
    },
  ],
  2: [
    {
      id: 'academic-start',
      message: 'Nice progress! Academic section coming up 📚',
      subMessage: 'Have your latest results handy',
      type: 'tip',
      delay: 500,
      duration: 6000,
    },
    {
      id: 'aps-tip',
      message: 'Use our APS Calculator to check your score!',
      subMessage: 'It updates automatically as you add subjects',
      type: 'tip',
      delay: 20000,
      duration: 8000,
    },
  ],
  3: [
    {
      id: 'documents-tip',
      message: 'Almost halfway there! Keep going! 💪',
      subMessage: 'Documents section is quick',
      type: 'encouragement',
      delay: 500,
      duration: 5000,
    },
  ],
  4: [
    {
      id: 'statement-tip',
      message: 'This is your chance to shine! ✨',
      subMessage: 'Tell us your unique story',
      type: 'encouragement',
      delay: 500,
      duration: 6000,
    },
  ],
  5: [
    {
      id: 'activities-tip',
      message: 'Show us what makes you special! 🎯',
      subMessage: 'Sports, clubs, volunteering - it all counts!',
      type: 'tip',
      delay: 500,
      duration: 6000,
    },
  ],
};

const progressMilestones: BubbleMessage[] = [
  {
    id: 'progress-25',
    message: '25% complete! You\'re on fire! 🔥',
    subMessage: 'Keep up the great work',
    type: 'milestone',
    duration: 5000,
  },
  {
    id: 'progress-50',
    message: 'Halfway there! Amazing progress! 🎉',
    subMessage: 'You\'re doing wonderfully',
    type: 'celebration',
    duration: 5000,
  },
  {
    id: 'progress-75',
    message: '75% done! The finish line is in sight! 🏆',
    subMessage: 'Just a few more sections',
    type: 'milestone',
    duration: 5000,
  },
  {
    id: 'progress-90',
    message: 'Almost there! Final stretch! 🚀',
    subMessage: 'Your application is nearly complete',
    type: 'celebration',
    duration: 5000,
  },
];

export const BubbleManager = ({ 
  currentStep, 
  progress, 
  formStarted,
  userName 
}: BubbleManagerProps) => {
  const [activeBubbles, setActiveBubbles] = useState<BubbleMessage[]>([]);
  const [shownBubbleIds, setShownBubbleIds] = useState<Set<string>>(new Set());

  const showBubble = useCallback((bubble: BubbleMessage) => {
    if (shownBubbleIds.has(bubble.id)) return;
    
    setShownBubbleIds(prev => new Set([...prev, bubble.id]));
    setActiveBubbles(prev => [...prev, bubble]);
  }, [shownBubbleIds]);

  const dismissBubble = useCallback((id: string) => {
    setActiveBubbles(prev => prev.filter(b => b.id !== id));
  }, []);

  // Show step-specific messages
  useEffect(() => {
    if (!formStarted) return;
    
    const messages = stepMessages[currentStep] || [];
    messages.forEach(msg => {
      const timer = setTimeout(() => showBubble(msg), msg.delay || 0);
      return () => clearTimeout(timer);
    });
  }, [currentStep, formStarted, showBubble]);

  // Show progress milestones
  useEffect(() => {
    if (!formStarted) return;
    
    if (progress >= 25 && progress < 30) {
      showBubble(progressMilestones[0]);
    } else if (progress >= 50 && progress < 55) {
      showBubble(progressMilestones[1]);
    } else if (progress >= 75 && progress < 80) {
      showBubble(progressMilestones[2]);
    } else if (progress >= 90 && progress < 95) {
      showBubble(progressMilestones[3]);
    }
  }, [progress, formStarted, showBubble]);

  // Show personalized welcome if name is entered
  useEffect(() => {
    if (userName && userName.length > 0 && !shownBubbleIds.has('personal-welcome')) {
      const timer = setTimeout(() => {
        showBubble({
          id: 'personal-welcome',
          message: `Great to meet you, ${userName}! 👋`,
          subMessage: 'Your application is looking good',
          type: 'celebration',
          duration: 5000,
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [userName, showBubble, shownBubbleIds]);

  return (
    <>
      {activeBubbles.map((bubble, index) => (
        <TipBubble
          key={bubble.id}
          message={bubble.message}
          subMessage={bubble.subMessage}
          type={bubble.type}
          position={index % 2 === 0 ? 'bottom-right' : 'top-right'}
          autoHide={bubble.duration}
          onDismiss={() => dismissBubble(bubble.id)}
          className={index > 0 ? `mt-${index * 4}` : ''}
        />
      ))}
    </>
  );
};
