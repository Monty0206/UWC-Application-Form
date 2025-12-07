import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export interface ApplicationFormData {
  personal: {
    firstName: string;
    surname: string;
    email: string;
    phone: string;
    phoneVerified?: boolean;
    idNumber: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    city: string;
    postalCode: string;
    profileImage?: string;
  };
  academic: {
    highSchool: string;
    grade12Year: string;
    subjects: Array<{
      id: string;
      name: string;
      level: string;
      grade: string;
    }>;
    firstChoice: string;
    secondChoice: string;
  };
  documents: {
    idDocument?: string;
    transcript?: string;
    proofOfResidence?: string;
  };
  statement: {
    personalStatement: string;
    whyUWC: string;
  };
  activities: Array<{
    id: string;
    name: string;
    role: string;
    yearsActive: string;
    description: string;
  }>;
  experience: Array<{
    id: string;
    employer: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  references: Array<{
    id: string;
    name: string;
    relationship: string;
    email: string;
    phone: string;
  }>;
  residence: {
    needsResidence: boolean;
    preferredRes: string;
    specialNeeds: string;
  };
  financial: {
    needsFinancialAid: boolean;
    nsfasApplied: boolean;
    otherFunding: string;
  };
}

const defaultFormData: ApplicationFormData = {
  personal: {
    firstName: '',
    surname: '',
    email: '',
    phone: '',
    phoneVerified: false,
    idNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    postalCode: '',
  },
  academic: {
    highSchool: '',
    grade12Year: '',
    subjects: [],
    firstChoice: '',
    secondChoice: '',
  },
  documents: {},
  statement: {
    personalStatement: '',
    whyUWC: '',
  },
  activities: [],
  experience: [],
  references: [],
  residence: {
    needsResidence: false,
    preferredRes: '',
    specialNeeds: '',
  },
  financial: {
    needsFinancialAid: false,
    nsfasApplied: false,
    otherFunding: '',
  },
};

const STORAGE_KEY = 'uwc-application-data';

export const useApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationFormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData || defaultFormData);
        setCurrentStep(parsed.currentStep || 1);
        setCompletedSteps(parsed.completedSteps || []);
        setLastSaved(parsed.lastSaved ? new Date(parsed.lastSaved) : null);
      } catch (e) {
        console.error('Failed to load saved application:', e);
      }
    }
  }, []);

  // Auto-save on form data change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveProgress();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  const saveProgress = useCallback(() => {
    setIsSaving(true);
    try {
      const saveData = {
        formData,
        currentStep,
        completedSteps,
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
      setLastSaved(new Date());
      setIsSaving(false);
    } catch (e) {
      console.error('Failed to save progress:', e);
      setIsSaving(false);
    }
  }, [formData, currentStep, completedSteps]);

  const manualSave = useCallback(() => {
    saveProgress();
    toast.success('Progress saved!', {
      description: 'Your application has been saved. You can continue later.',
    });
  }, [saveProgress]);

  const updateFormData = useCallback(<K extends keyof ApplicationFormData>(
    section: K,
    data: Partial<ApplicationFormData[K]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const nextStep = useCallback(() => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    if (currentStep < 10) {
      goToStep(currentStep + 1);
    }
  }, [currentStep, completedSteps, goToStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  const calculateProgress = useCallback(() => {
    // Calculate based on filled fields
    const sections = {
      personal: Object.values(formData.personal).filter(Boolean).length / 10,
      academic: (Object.values(formData.academic).filter((v) => 
        typeof v === 'string' ? v : Array.isArray(v) ? v.length > 0 : false
      ).length) / 4,
      documents: Object.values(formData.documents).filter(Boolean).length / 3,
      statement: Object.values(formData.statement).filter(Boolean).length / 2,
      activities: formData.activities.length > 0 ? 1 : 0,
      experience: 1, // Optional
      references: formData.references.length >= 2 ? 1 : formData.references.length / 2,
      residence: 1, // Conditional
      financial: 1, // Conditional
    };

    const total = Object.values(sections).reduce((a, b) => a + b, 0);
    return Math.round((total / 9) * 100);
  }, [formData]);

  const resetForm = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(defaultFormData);
    setCurrentStep(1);
    setCompletedSteps([]);
    setLastSaved(null);
  }, []);

  return {
    formData,
    currentStep,
    completedSteps,
    isSaving,
    lastSaved,
    progress: calculateProgress(),
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    saveProgress: manualSave,
    resetForm,
  };
};
