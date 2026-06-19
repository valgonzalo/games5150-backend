import { genreRepository } from '../repositories/genre.repository.js';
import { ServerError } from '../utils/ServerError.js';

export const genreService = {
  async getAllGenres() {
    return await genreRepository.findAll();
  },

  async getGenreById(id) {
    const genre = await genreRepository.findById(id);
    if (!genre) throw new ServerError('Género no encontrado', 404);
    return genre;
  },

  async createGenre(data) {
    if (!data.name) throw new ServerError('El nombre del género es requerido', 400);
    return await genreRepository.create(data);
  },

  async updateGenre(id, data) {
    const genre = await genreRepository.findById(id);
    if (!genre) throw new ServerError('Género no encontrado', 404);
    return await genreRepository.update(id, data);
  },

  async deleteGenre(id) {
    const genre = await genreRepository.findById(id);
    if (!genre) throw new ServerError('Género no encontrado', 404);
    await genreRepository.delete(id);
    return { message: 'Género eliminado exitosamente' };
  }
};
