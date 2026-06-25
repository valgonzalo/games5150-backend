import { z } from 'zod';

export const gameSchema = z.object({
  title: z.string({ required_error: 'El título es requerido' }).min(1, 'El título no puede estar vacío'),
  developer: z.string({ required_error: 'El desarrollador es requerido' }).min(1, 'El desarrollador no puede estar vacío'),
  release_year: z.number({ required_error: 'El año de lanzamiento es requerido' }).int().positive(),
  genre_id: z.number({ required_error: 'El ID del género es requerido' }).int().positive(),
  description: z.string().optional(),
  platform: z.string().optional(),
  cover_url: z.string().url('URL de portada inválida').optional().or(z.literal('')),
  min_requirements: z.string().optional(),
  recommended_requirements: z.string().optional(),
  steam_link: z.string().url('Enlace de Steam inválido').optional().or(z.literal('')),
  screenshots: z.array(z.string().url()).optional(),
  active: z.boolean().optional()
});
