import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'El correo electrónico es requerido' })
    .email({ message: 'Ingresa un correo electrónico válido' })
    .max(255, { message: 'El correo no puede exceder 255 caracteres' }),
  password: z
    .string()
    .min(1, { message: 'La contraseña es requerida' })
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: 'El nombre completo es requerido' })
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .max(100, { message: 'El nombre no puede exceder 100 caracteres' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'El correo electrónico es requerido' })
    .email({ message: 'Ingresa un correo electrónico válido' })
    .max(255, { message: 'El correo no puede exceder 255 caracteres' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .max(72, { message: 'La contraseña no puede exceder 72 caracteres' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'El correo electrónico es requerido' })
    .email({ message: 'Ingresa un correo electrónico válido' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
