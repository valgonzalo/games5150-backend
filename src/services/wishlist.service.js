import { wishlistRepository } from '../repositories/wishlist.repository.js';
import { ServerError } from '../utils/ServerError.js';

export const wishlistService = {
  async getWishlist(user_id) {
    return await wishlistRepository.findAllByUserId(user_id);
  },

  async addGameToWishlist(user_id, game_id) {
    if (!game_id) throw new ServerError('El ID del juego es requerido', 400);
    
    const existing = await wishlistRepository.findByUserAndGame(user_id, game_id);
    if (existing) throw new ServerError('El juego ya está en tu lista de deseados', 400);

    return await wishlistRepository.create(user_id, game_id);
  },

  async removeGameFromWishlist(user_id, game_id) {
    const existing = await wishlistRepository.findByUserAndGame(user_id, game_id);
    if (!existing) throw new ServerError('El juego no está en tu lista de deseados', 404);

    await wishlistRepository.delete(user_id, game_id);
    return { message: 'Juego eliminado de tu lista de deseados' };
  }
};
