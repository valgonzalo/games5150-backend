import { gameRepository } from '../repositories/game.repository.js';
import { ServerError } from '../utils/ServerError.js';

export const gameService = {
  async getAllGames(query) {
    return await gameRepository.findAll(query);
  },

  async getGameById(id) {
    const game = await gameRepository.findById(id);
    if (!game) throw new ServerError('Juego no encontrado', 404);
    return game;
  },

  async createGame(data) {
    if (!data.title || !data.developer || !data.release_year || !data.genre_id) {
      throw new ServerError('Faltan campos obligatorios', 400);
    }
    return await gameRepository.create(data);
  },

  async updateGame(id, data) {
    const game = await gameRepository.findById(id);
    if (!game) throw new ServerError('Juego no encontrado', 404);
    return await gameRepository.update(id, data);
  },

  async deleteGame(id) {
    const game = await gameRepository.findById(id);
    if (!game) throw new ServerError('Juego no encontrado', 404);
    await gameRepository.delete(id);
    return { message: 'Juego eliminado exitosamente' };
  }
};
