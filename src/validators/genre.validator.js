import { z } from 'zod';

export const genreSchema = z.object({
  name: z.string({ required_error: 'El nombre del género es requerido' }).min(1, 'El nombre no puede estar vacío')
});
