import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string({ required_error: 'El nombre es requerido' }).min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string({ required_error: 'El email es requerido' }).email('Email inválido'),
  password: z.string({ required_error: 'La contraseña es requerida' }).min(6, 'La contraseña debe tener al menos 6 caracteres')
});

export const loginSchema = z.object({
  email: z.string({ required_error: 'Email requerido' }).email('Email inválido'),
  password: z.string({ required_error: 'Contraseña requerida' }).min(1, 'Contraseña requerida')
});
