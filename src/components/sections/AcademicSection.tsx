import { useState } from 'react';
import { GraduationCap, School, BookOpen, Plus, Trash2, ChevronDown } from 'lucide-react';
import { FormSection } from '@/components/form/FormSection';
import { FormField } from '@/components/form/FormField';
import { AnimatedInput } from '@/components/form/AnimatedInput';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Subject {
  id: string;
  name: string;
  level: string;
  grade: string;
}

interface AcademicData {
  highSchool: string;
  grade12Year: string;
  subjects: Subject[];
  firstChoice: string;
  secondChoice: string;
}

interface AcademicSectionProps {
  data: AcademicData;
  onChange: (data: Partial<AcademicData>) => void;
  errors?: Record<string, string>;
}

const subjectOptions = [
  'Mathematics',
  'Mathematical Literacy',
  'Physical Sciences',
  'Life Sciences',
  'Accounting',
  'Business Studies',
  'Economics',
  'Geography',
  'History',
  'English Home Language',
  'English First Additional Language',
  'Afrikaans Home Language',
  'Afrikaans First Additional Language',
  'IsiXhosa Home Language',
  'IsiXhosa First Additional Language',
  'Life Orientation',
  'Information Technology',
  'Computer Applications Technology',
  'Visual Arts',
  'Music',
  'Dramatic Arts',
];

const programOptions = [
  'Bachelor of Arts (BA)',
  'Bachelor of Commerce (BCom)',
  'Bachelor of Science (BSc)',
  'Bachelor of Social Work (BSW)',
  'Bachelor of Laws (LLB)',
  'Bachelor of Education (BEd)',
  'Bachelor of Nursing',
  'Bachelor of Pharmacy',
  'Bachelor of Dentistry',
  'Bachelor of Medicine (MBChB)',
];

export const AcademicSection = ({ data, onChange, errors = {} }: AcademicSectionProps) => {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const addSubject = () => {
    const newSubject: Subject = {
      id: crypto.randomUUID(),
      name: '',
      level: 'Higher',
      grade: '',
    };
    onChange({ subjects: [...data.subjects, newSubject] });
    setExpandedSubject(newSubject.id);
  };

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    onChange({
      subjects: data.subjects.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    });
  };

  const removeSubject = (id: string) => {
    onChange({
      subjects: data.subjects.filter((s) => s.id !== id),
    });
  };

  const getAPS = () => {
    // Simplified APS calculation
    let total = 0;
    data.subjects.forEach((subject) => {
      const grade = parseInt(subject.grade);
      if (!isNaN(grade)) {
        if (grade >= 80) total += 7;
        else if (grade >= 70) total += 6;
        else if (grade >= 60) total += 5;
        else if (grade >= 50) total += 4;
        else if (grade >= 40) total += 3;
        else if (grade >= 30) total += 2;
        else total += 1;
      }
    });
    return total;
  };

  return (
    <FormSection
      title="Academic Information"
      description="Tell us about your educational background and chosen programs."
      icon={<GraduationCap className="w-5 h-5" />}
    >
      {/* School Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FormField
          label="High School Name"
          required
          error={errors.highSchool}
          success={!!data.highSchool && !errors.highSchool}
        >
          <AnimatedInput
            icon={<School className="w-4 h-4" />}
            placeholder="Name of your high school"
            value={data.highSchool}
            onChange={(e) => onChange({ highSchool: e.target.value })}
          />
        </FormField>

        <FormField
          label="Grade 12 Year"
          required
          error={errors.grade12Year}
          success={!!data.grade12Year && !errors.grade12Year}
        >
          <AnimatedInput
            type="number"
            placeholder="e.g., 2024"
            min="2020"
            max="2025"
            value={data.grade12Year}
            onChange={(e) => onChange({ grade12Year: e.target.value })}
          />
        </FormField>
      </div>

      {/* Subjects */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-uwc-gold" />
              Grade 12 Subjects
            </h3>
            <p className="text-sm text-muted-foreground">
              Add your subjects with expected or final marks
            </p>
          </div>
          
          {/* APS Score Display */}
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Estimated APS</p>
            <p className="text-3xl font-bold text-uwc-gold">{getAPS()}</p>
          </div>
        </div>

        {/* Subject list */}
        <div className="space-y-3">
          {data.subjects.map((subject, index) => (
            <div
              key={subject.id}
              className={cn(
                "border border-border rounded-xl overflow-hidden transition-all duration-300",
                expandedSubject === subject.id ? "bg-muted/30" : "bg-card hover:border-uwc-gold/30"
              )}
            >
              {/* Subject header */}
              <button
                type="button"
                onClick={() => setExpandedSubject(expandedSubject === subject.id ? null : subject.id)}
                className="w-full px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-uwc-gold/10 text-uwc-gold text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className={cn(
                    "font-medium",
                    subject.name ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {subject.name || 'Select subject'}
                  </span>
                  {subject.grade && (
                    <span className="px-2 py-0.5 bg-uwc-gold/10 text-uwc-gold rounded-full text-xs font-medium">
                      {subject.grade}%
                    </span>
                  )}
                </div>
                <ChevronDown className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform duration-200",
                  expandedSubject === subject.id && "rotate-180"
                )} />
              </button>
              
              {/* Expanded content */}
              {expandedSubject === subject.id && (
                <div className="px-4 pb-4 pt-2 border-t border-border animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Subject
                      </label>
                      <select
                        className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:border-uwc-gold"
                        value={subject.name}
                        onChange={(e) => updateSubject(subject.id, { name: e.target.value })}
                      >
                        <option value="">Select subject</option>
                        {subjectOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Level
                      </label>
                      <select
                        className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:border-uwc-gold"
                        value={subject.level}
                        onChange={(e) => updateSubject(subject.id, { level: e.target.value })}
                      >
                        <option value="Higher">Higher Grade</option>
                        <option value="Standard">Standard Grade</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Mark (%)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="0-100"
                          className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:border-uwc-gold"
                          value={subject.grade}
                          onChange={(e) => updateSubject(subject.id, { grade: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSubject(subject.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add subject button */}
        <Button
          type="button"
          variant="outline"
          onClick={addSubject}
          className="mt-4 w-full border-dashed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Subject
        </Button>
      </div>

      {/* Program Choices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="First Choice Program"
          required
          tooltip="Your preferred degree program"
        >
          <select
            className="w-full h-12 px-4 rounded-xl border-2 border-input bg-background text-foreground focus:outline-none focus:border-uwc-gold focus:ring-4 focus:ring-uwc-gold/10 transition-all duration-200"
            value={data.firstChoice}
            onChange={(e) => onChange({ firstChoice: e.target.value })}
          >
            <option value="">Select program</option>
            {programOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Second Choice Program"
          tooltip="Alternative program if first choice is not available"
        >
          <select
            className="w-full h-12 px-4 rounded-xl border-2 border-input bg-background text-foreground focus:outline-none focus:border-uwc-gold focus:ring-4 focus:ring-uwc-gold/10 transition-all duration-200"
            value={data.secondChoice}
            onChange={(e) => onChange({ secondChoice: e.target.value })}
          >
            <option value="">Select program</option>
            {programOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </FormField>
      </div>
    </FormSection>
  );
};
