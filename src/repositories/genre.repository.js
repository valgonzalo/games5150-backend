import { Genre } from '../models/genre.model.js';

export const genreRepository = {
  async findAll() {
    return await Genre.findAll({ where: { active: true } });
  },

  async findById(id) {
    return await Genre.findOne({ where: { id, active: true } });
  },

  async create(data) {
    return await Genre.create(data);
  },

  async update(id, data) {
    await Genre.update(data, { where: { id } });
    return await this.findById(id);
  },

  async delete(id) {
    return await Genre.update({ active: false }, { where: { id } });
  }
};
