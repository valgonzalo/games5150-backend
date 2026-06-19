import { genreService } from '../services/genre.service.js';

export const genreController = {
  async getAll(req, res, next) {
    try {
      const data = await genreService.getAllGenres();
      res.status(200).json({ ok: true, status: 200, data });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const data = await genreService.getGenreById(req.params.id);
      res.status(200).json({ ok: true, status: 200, data });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const data = await genreService.createGenre(req.body);
      res.status(201).json({ ok: true, status: 201, data });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const data = await genreService.updateGenre(req.params.id, req.body);
      res.status(200).json({ ok: true, status: 200, data });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const data = await genreService.deleteGenre(req.params.id);
      res.status(200).json({ ok: true, status: 200, message: data.message });
    } catch (error) {
      next(error);
    }
  }
};
