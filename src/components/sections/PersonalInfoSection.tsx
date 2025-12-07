import { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Camera, Upload, X } from 'lucide-react';
import { FormSection } from '@/components/form/FormSection';
import { FormField } from '@/components/form/FormField';
import { AnimatedInput } from '@/components/form/AnimatedInput';
import { OTPVerification } from '@/components/verification/OTPVerification';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PersonalInfoData {
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
}

interface PersonalInfoSectionProps {
  data: PersonalInfoData;
  onChange: (data: Partial<PersonalInfoData>) => void;
  errors?: Record<string, string>;
}

export const PersonalInfoSection = ({ data, onChange, errors = {} }: PersonalInfoSectionProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(data.profileImage || null);
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        onChange({ profileImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  return (
    <FormSection 
      title="Personal Information" 
      description="Tell us about yourself. All fields marked with * are required."
      icon={<User className="w-5 h-5" />}
    >
      {/* Profile Picture Upload */}
      <div className="mb-8">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Profile Picture <span className="text-destructive">*</span>
        </label>
        <div className="flex items-start gap-6">
          {/* Preview */}
          <div className="relative group">
            <div 
              className={cn(
                "w-28 h-28 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-300",
                imagePreview ? "border-success bg-success/5" : "border-muted-foreground/30 bg-muted/50",
                dragActive && "border-uwc-gold bg-uwc-gold/5 scale-105"
              )}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Profile preview" className="w-full h-full object-cover" />
                  <button
                    onClick={() => {
                      setImagePreview(null);
                      onChange({ profileImage: undefined });
                    }}
                    className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <Camera className="w-8 h-8 text-muted-foreground/50" />
              )}
            </div>
          </div>
          
          {/* Upload button */}
          <div className="flex-1">
            <input
              type="file"
              id="profileImage"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('profileImage')?.click()}
              className="mb-2"
            >
              <Upload className="w-4 h-4 mr-2" />
              {imagePreview ? 'Change Photo' : 'Upload Photo'}
            </Button>
            <p className="text-xs text-muted-foreground">
              JPG or PNG, max 2MB. Passport-style photo recommended.
            </p>
          </div>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField 
          label="First Name(s)" 
          required 
          error={errors.firstName}
          success={!!data.firstName && !errors.firstName}
        >
          <AnimatedInput
            icon={<User className="w-4 h-4" />}
            placeholder="Enter your first name(s)"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
          />
        </FormField>

        <FormField 
          label="Surname" 
          required 
          tooltip="As it appears on your ID document"
          error={errors.surname}
          success={!!data.surname && !errors.surname}
        >
          <AnimatedInput
            placeholder="Enter your surname"
            value={data.surname}
            onChange={(e) => onChange({ surname: e.target.value })}
          />
        </FormField>

        <FormField 
          label="Email Address" 
          required 
          tooltip="We'll send important updates to this email"
          error={errors.email}
          success={!!data.email && !errors.email}
          className="md:col-span-2"
        >
          <AnimatedInput
            type="email"
            icon={<Mail className="w-4 h-4" />}
            placeholder="your.email@example.com"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </FormField>

        <FormField 
          label="Phone Number" 
          required 
          tooltip="For SMS notifications about your application"
          error={errors.phone}
          success={!!data.phone && !errors.phone}
        >
          <AnimatedInput
            type="tel"
            icon={<Phone className="w-4 h-4" />}
            placeholder="+27 XXX XXX XXXX"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
          />
        </FormField>

        {/* OTP Verification - Demo Feature */}
        <div className="md:col-span-2">
          <OTPVerification
            phoneNumber={data.phone}
            onVerify={(code) => {
              console.log('OTP verified:', code);
              onChange({ phoneVerified: true });
            }}
            onResend={() => console.log('OTP resent')}
            isVerified={data.phoneVerified}
          />
        </div>

        <FormField 
          label="SA ID Number / Passport" 
          required 
          error={errors.idNumber}
          success={!!data.idNumber && !errors.idNumber}
        >
          <AnimatedInput
            placeholder="Enter your ID or passport number"
            value={data.idNumber}
            onChange={(e) => onChange({ idNumber: e.target.value })}
          />
        </FormField>

        <FormField 
          label="Date of Birth" 
          required 
          error={errors.dateOfBirth}
          success={!!data.dateOfBirth && !errors.dateOfBirth}
        >
          <AnimatedInput
            type="date"
            icon={<Calendar className="w-4 h-4" />}
            value={data.dateOfBirth}
            onChange={(e) => onChange({ dateOfBirth: e.target.value })}
          />
        </FormField>

        <FormField label="Gender" required>
          <select
            className="w-full h-12 px-4 rounded-xl border-2 border-input bg-background text-foreground focus:outline-none focus:border-uwc-gold focus:ring-4 focus:ring-uwc-gold/10 transition-all duration-200"
            value={data.gender}
            onChange={(e) => onChange({ gender: e.target.value })}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not">Prefer not to say</option>
          </select>
        </FormField>

        <FormField 
          label="Residential Address" 
          required 
          className="md:col-span-2"
          error={errors.address}
          success={!!data.address && !errors.address}
        >
          <AnimatedInput
            icon={<MapPin className="w-4 h-4" />}
            placeholder="Street address"
            value={data.address}
            onChange={(e) => onChange({ address: e.target.value })}
          />
        </FormField>

        <FormField label="City / Town" required>
          <AnimatedInput
            placeholder="City or town"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
          />
        </FormField>

        <FormField label="Postal Code" required>
          <AnimatedInput
            placeholder="Postal code"
            value={data.postalCode}
            onChange={(e) => onChange({ postalCode: e.target.value })}
          />
        </FormField>
      </div>
    </FormSection>
  );
};
