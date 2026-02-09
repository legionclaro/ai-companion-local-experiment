import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Briefcase } from 'lucide-react';
import {
  professionalProfileSchema,
  type ProfessionalProfileFormData,
  SPECIALTIES,
  ROLES,
  EXPERIENCE_LEVELS,
  LANGUAGES,
} from '@/lib/validations/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

interface Step2ProfessionalProfileProps {
  defaultValues?: Partial<ProfessionalProfileFormData>;
  onNext: (data: ProfessionalProfileFormData) => void;
  onBack: () => void;
}

export function Step2ProfessionalProfile({ defaultValues, onNext, onBack }: Step2ProfessionalProfileProps) {
  const form = useForm<ProfessionalProfileFormData>({
    resolver: zodResolver(professionalProfileSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      specialties: defaultValues?.specialties || [],
      roles: defaultValues?.roles || [],
      experienceLevel: defaultValues?.experienceLevel || undefined,
      yearsExperience: defaultValues?.yearsExperience || 0,
      languages: defaultValues?.languages || ['Español'],
    },
  });

  const onSubmit = (data: ProfessionalProfileFormData) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título profesional</FormLabel>
              <FormControl>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Ej: Biólogo especialista en herpetología"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specialties"
          render={() => (
            <FormItem>
              <FormLabel>Especialidades (máximo 5)</FormLabel>
              <FormDescription>Selecciona tus áreas de especialización</FormDescription>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {SPECIALTIES.map((specialty) => (
                  <Controller
                    key={specialty.value}
                    control={form.control}
                    name="specialties"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`specialty-${specialty.value}`}
                          checked={field.value?.includes(specialty.value)}
                          onCheckedChange={(checked) => {
                            const current = field.value || [];
                            if (checked) {
                              if (current.length < 5) {
                                field.onChange([...current, specialty.value]);
                              }
                            } else {
                              field.onChange(current.filter((v) => v !== specialty.value));
                            }
                          }}
                        />
                        <Label
                          htmlFor={`specialty-${specialty.value}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {specialty.label}
                        </Label>
                      </div>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roles"
          render={() => (
            <FormItem>
              <FormLabel>Roles disponibles</FormLabel>
              <FormDescription>¿Qué tipo de trabajo puedes realizar?</FormDescription>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {ROLES.map((role) => (
                  <Controller
                    key={role.value}
                    control={form.control}
                    name="roles"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`role-${role.value}`}
                          checked={field.value?.includes(role.value)}
                          onCheckedChange={(checked) => {
                            const current = field.value || [];
                            if (checked) {
                              field.onChange([...current, role.value]);
                            } else {
                              field.onChange(current.filter((v) => v !== role.value));
                            }
                          }}
                        />
                        <Label
                          htmlFor={`role-${role.value}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {role.label}
                        </Label>
                      </div>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nivel de experiencia</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {EXPERIENCE_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearsExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Años de experiencia</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={50}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="languages"
          render={() => (
            <FormItem>
              <FormLabel>Idiomas</FormLabel>
              <div className="flex flex-wrap gap-2 mt-2">
                {LANGUAGES.map((language) => (
                  <Controller
                    key={language.value}
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`language-${language.value}`}
                          checked={field.value?.includes(language.value)}
                          onCheckedChange={(checked) => {
                            const current = field.value || [];
                            if (checked) {
                              field.onChange([...current, language.value]);
                            } else {
                              field.onChange(current.filter((v) => v !== language.value));
                            }
                          }}
                        />
                        <Label
                          htmlFor={`language-${language.value}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {language.label}
                        </Label>
                      </div>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Atrás
          </Button>
          <Button type="submit" className="flex-1">
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
