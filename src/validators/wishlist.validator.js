import { z } from 'zod';

export const addWishlistSchema = z.object({
  game_id: z.number({ required_error: 'El ID del juego es requerido' }).int().positive()
});
