import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type {
  BasicDataFormData,
  ProfessionalProfileFormData,
  AvailabilityFormData,
} from '@/lib/validations/profile';
import { StepIndicator } from './StepIndicator';
import { Step1BasicData } from './Step1BasicData';
import { Step2ProfessionalProfile } from './Step2ProfessionalProfile';
import { Step3Availability } from './Step3Availability';
import { Button } from '@/components/ui/button';

const STEP_LABELS = ['Datos básicos', 'Perfil profesional', 'Disponibilidad'];

interface FormData {
  basicData?: BasicDataFormData;
  professionalProfile?: ProfessionalProfileFormData;
  availability?: AvailabilityFormData;
}

export function BiologistRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const { toast } = useToast();

  const handleStep1Complete = (data: BasicDataFormData) => {
    setFormData((prev) => ({ ...prev, basicData: data }));
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: ProfessionalProfileFormData) => {
    setFormData((prev) => ({ ...prev, professionalProfile: data }));
    setCurrentStep(3);
  };

  const handleStep3Complete = async (data: AvailabilityFormData) => {
    setFormData((prev) => ({ ...prev, availability: data }));
    setIsLoading(true);

    try {
      const { basicData, professionalProfile } = formData;

      if (!basicData || !professionalProfile) {
        throw new Error('Datos incompletos');
      }

      // 1. Create auth user with ALL profile data in metadata
      // The DB trigger handle_new_user() will catch this and create the public.profiles record
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: basicData.email,
        password: basicData.password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: basicData.fullName,
            title: professionalProfile.title,
            specialties: professionalProfile.specialties,
            roles: professionalProfile.roles,
            experience_level: professionalProfile.experienceLevel,
            years_experience: professionalProfile.yearsExperience,
            languages: professionalProfile.languages,
            availability: data.availability,
            location: data.location,
            bio: data.bio || null,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No se pudo crear el usuario');

      // The profile is now created automatically by the Postgres trigger!
      // No manual insert needed here anymore.


      setRegistrationComplete(true);
      toast({
        title: '¡Registro exitoso!',
        description: 'Te hemos enviado un correo de confirmación.',
      });

    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        variant: 'destructive',
        title: 'Error al registrarse',
        description: error.message || 'Ocurrió un error inesperado',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (registrationComplete) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">¡Revisa tu correo!</h3>
        <p className="text-muted-foreground">
          Te hemos enviado un enlace de confirmación a{' '}
          <span className="font-medium text-foreground">{formData.basicData?.email}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Una vez confirmes tu correo, tu perfil entrará en proceso de verificación
          por nuestro comité de curadores.
        </p>
        <Button variant="outline" asChild className="mt-4">
          <Link to="/auth/login">Volver al inicio de sesión</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <StepIndicator
        currentStep={currentStep}
        totalSteps={3}
        stepLabels={STEP_LABELS}
      />

      {currentStep === 1 && (
        <Step1BasicData
          defaultValues={formData.basicData}
          onNext={handleStep1Complete}
        />
      )}

      {currentStep === 2 && (
        <Step2ProfessionalProfile
          defaultValues={formData.professionalProfile}
          onNext={handleStep2Complete}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <Step3Availability
          defaultValues={formData.availability}
          onSubmit={handleStep3Complete}
          onBack={() => setCurrentStep(2)}
          isLoading={isLoading}
        />
      )}

      <p className="text-center text-sm text-muted-foreground mt-6">
        ¿Ya tienes cuenta?{' '}
        <Link to="/auth/login" className="text-primary font-medium hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
