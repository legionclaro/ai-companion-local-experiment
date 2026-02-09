import { z } from 'zod';

// Constants for form options
export const SPECIALTIES = [
  { value: 'botánica', label: 'Botánica' },
  { value: 'zoología', label: 'Zoología' },
  { value: 'herpetología', label: 'Herpetología' },
  { value: 'ornitología', label: 'Ornitología' },
  { value: 'entomología', label: 'Entomología' },
  { value: 'ecología', label: 'Ecología' },
  { value: 'conservación', label: 'Conservación' },
  { value: 'GIS', label: 'GIS' },
  { value: 'taxonomía', label: 'Taxonomía' },
  { value: 'biología_marina', label: 'Biología Marina' },
] as const;

export const ROLES = [
  { value: 'consultoría', label: 'Consultoría' },
  { value: 'campo', label: 'Trabajo de Campo' },
  { value: 'curaduría', label: 'Curaduría' },
  { value: 'investigación', label: 'Investigación' },
] as const;

export const EXPERIENCE_LEVELS = [
  { value: 'junior', label: 'Junior (0-2 años)' },
  { value: 'intermedio', label: 'Intermedio (3-5 años)' },
  { value: 'senior', label: 'Senior (6-10 años)' },
  { value: 'experto', label: 'Experto (10+ años)' },
] as const;

export const AVAILABILITY_OPTIONS = [
  { value: 'local', label: 'Local (solo mi ciudad)' },
  { value: 'nacional', label: 'Nacional (todo el país)' },
  { value: 'regional', label: 'Regional (Caribe/Latinoamérica)' },
] as const;

export const LANGUAGES = [
  { value: 'Español', label: 'Español' },
  { value: 'Inglés', label: 'Inglés' },
  { value: 'Francés', label: 'Francés' },
  { value: 'Portugués', label: 'Portugués' },
  { value: 'Alemán', label: 'Alemán' },
] as const;

// Step 1: Basic data
export const basicDataSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z
    .string()
    .trim()
    .email('Ingresa un correo electrónico válido')
    .max(255, 'El correo no puede exceder 255 caracteres'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(72, 'La contraseña no puede exceder 72 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

// Step 2: Professional profile
export const professionalProfileSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'El título debe tener al menos 2 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),
  specialties: z
    .array(z.string())
    .min(1, 'Selecciona al menos una especialidad')
    .max(5, 'Máximo 5 especialidades'),
  roles: z
    .array(z.string())
    .min(1, 'Selecciona al menos un rol')
    .max(4, 'Máximo 4 roles'),
  experienceLevel: z.enum(['junior', 'intermedio', 'senior', 'experto'], {
    required_error: 'Selecciona tu nivel de experiencia',
  }),
  yearsExperience: z
    .number()
    .min(0, 'Los años deben ser 0 o más')
    .max(50, 'Máximo 50 años'),
  languages: z
    .array(z.string())
    .min(1, 'Selecciona al menos un idioma'),
});

// Step 3: Availability and location
export const availabilitySchema = z.object({
  availability: z.enum(['local', 'nacional', 'regional'], {
    required_error: 'Selecciona tu disponibilidad',
  }),
  location: z
    .string()
    .trim()
    .min(2, 'La ubicación debe tener al menos 2 caracteres')
    .max(100, 'La ubicación no puede exceder 100 caracteres'),
  bio: z
    .string()
    .trim()
    .max(500, 'La biografía no puede exceder 500 caracteres')
    .optional(),
});

// Combined schema for complete registration (for reference)
export const biologist_registrationSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
}).merge(professionalProfileSchema).merge(availabilitySchema);

export type BasicDataFormData = z.infer<typeof basicDataSchema>;
export type ProfessionalProfileFormData = z.infer<typeof professionalProfileSchema>;
export type AvailabilityFormData = z.infer<typeof availabilitySchema>;
export type BiologistRegistrationData = z.infer<typeof biologist_registrationSchema>;

// Institution registration schema
export const institutionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(150, 'El nombre no puede exceder 150 caracteres'),
  description: z
    .string()
    .trim()
    .max(1000, 'La descripción no puede exceder 1000 caracteres')
    .optional(),
  website: z
    .string()
    .trim()
    .url('Ingresa una URL válida')
    .optional()
    .or(z.literal('')),
  adminEmail: z
    .string()
    .trim()
    .email('Ingresa un correo electrónico válido'),
  adminPassword: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.adminPassword === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type InstitutionFormData = z.infer<typeof institutionSchema>;
