import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, MapPin, Loader2 } from 'lucide-react';
import {
  availabilitySchema,
  type AvailabilityFormData,
  AVAILABILITY_OPTIONS,
} from '@/lib/validations/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

interface Step3AvailabilityProps {
  defaultValues?: Partial<AvailabilityFormData>;
  onSubmit: (data: AvailabilityFormData) => void;
  onBack: () => void;
  isLoading: boolean;
}

export function Step3Availability({ defaultValues, onSubmit, onBack, isLoading }: Step3AvailabilityProps) {
  const form = useForm<AvailabilityFormData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      availability: defaultValues?.availability || undefined,
      location: defaultValues?.location || '',
      bio: defaultValues?.bio || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disponibilidad geográfica</FormLabel>
              <FormDescription>¿Dónde estás dispuesto a trabajar?</FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-2 mt-2"
                >
                  {AVAILABILITY_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer text-sm font-medium"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación actual</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Ej: Santo Domingo, República Dominicana"
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografía (opcional)</FormLabel>
              <FormDescription>
                Cuéntanos sobre tu experiencia y trayectoria profesional
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Soy un biólogo con experiencia en conservación de especies endémicas de la isla..."
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1" disabled={isLoading}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Atrás
          </Button>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando cuenta...
              </>
            ) : (
              'Crear cuenta'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
